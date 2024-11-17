import hashlib
import time
from datetime import datetime, timedelta

import psycopg2
from psycopg2 import sql
import logging

import config
# from db.migration import db_connection, db_config


db_config = {
    'dbname': config.DB_NAME,
    'user': config.DB_USER,
    'password': config.DB_PASSWORD,
    'host': config.DB_HOST,
    'port': config.DB_PORT,
}


def db_connection():
    return psycopg2.connect(**db_config)

logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)


async def get_all_points():
    connection = db_connection()
    cursor = connection.cursor()
    out = dict()

    try:
        three_days_ago = datetime.now().date() - timedelta(days=3)
        query = sql.SQL("""
        SELECT id, address, lat, lon, last_ts, problems FROM points where problems != %s; 
        """)
        cursor.execute(query, ("garbage", ))

        rows = cursor.fetchall()
        points = []
        for row in rows:
            status = row[5]
            if three_days_ago >= row[4].date():
                status = 'old'
            elif datetime.now().date() < row[4].date():
                status = 'no_see'
            if status != row[5]:
                query = sql.SQL("""UPDATE points
                                   SET problems = %s
                                   WHERE id = %s;
                        """)
                cursor.execute(query, (status, row[0]))
                cursor.connection.commit()

            point = {"id": row[0], "address": row[1], "lat": row[2], "lon": row[3], "last_ts": row[4],
                     "problems": status}
            points.append(point)
        out['points'] = points

        query = sql.SQL("""
        SELECT id, address, lat, lon, ts_2, status FROM garbage
        """)
        cursor.execute(query)

        rows = cursor.fetchall()
        points = []
        for row in rows:
            point = {"id": row[0], "address": row[1], "lat": row[2], "lon": row[3], "last_ts": row[4],
                     "problems": row[5]}
            points.append(point)

        logger.info("Database fetched successfully")
        out['garbage'] = points
        return out

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


async def get_point_information_by_id(id_point):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        query = sql.SQL("""SELECT id, address, lat, lon, last_ts, problems
FROM points
WHERE id = %s;""")
        cursor.execute(query, (id_point,))

        row = cursor.fetchone()

        query = sql.SQL("""SELECT containers, ts_1, ts_2, photo_1, photo_2, other_trash, status
FROM information_point
WHERE id_point = %s
order by ts_2 desc limit 1;
        """)
        cursor.execute(query, (id_point,))

        row1 = cursor.fetchone()

        point = {"id": row[0], "address": row[1], "lat": row[2], "lon": row[3], "last_ts": row[4], "problems": row[5],
                 "containers": row1[0], "ts_1": row1[1], "ts_2": row1[2], "photo_1": row1[3], "photo_2": row1[4],
                 "other_trash": row1[5], "status": row1[6]}

        logger.info("Database fetched successfully")
        return point

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


async def get_garbage_information_by_id(id_garbage):
    connection = db_connection()
    cursor = connection.cursor()
    try:
        query = sql.SQL("""
        SELECT id, address, lat, lon, ts_2, photo_1, photo_2, status 
        FROM garbage WHERE id = %s;
        """)
        cursor.execute(query, (id_garbage,))

        row = cursor.fetchone()

        # Проверка на случай, если не найдено записи с таким id
        if row is None:
            logger.warning(f"Garbage with id {id_garbage} not found.")
            return None

        point = {
            "id": row[0],
            "address": row[1],
            "lat": row[2],
            "lon": row[3],
            "last_ts": row[4],
            "photo_1": row[5],
            "photo_2": row[6],
            "status": row[7]
        }

        logger.info("Database fetched successfully")
        return point

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(f"Error fetching garbage info: {error}")

    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


async def get_point_by_coordinates(address, lat, lon):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        query = sql.SQL("""SELECT id, last_ts, problems
    FROM points
    WHERE lat = %s and lon = %s;""")
        cursor.execute(query, (lat, lon,))
        row = cursor.fetchone()
        if row is None:
            current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            query = sql.SQL("""
            INSERT INTO points (address, lat, lon, last_ts) VALUES (%s, %s, %s, %s) RETURNING id, last_ts, problems;""")
            cursor.execute(query, (address, lat, lon, current_time))
            row = cursor.fetchone()
            connection.commit()

        point = {"id": row[0], "last_ts": row[1], "problems": row[2]}

        logger.info("Database fetched successfully")

        return point

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


async def add_point_information(address, lat, lon, problems, containers, ts, photo,
                                other_trash, status):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        query = sql.SQL("""SELECT id
        FROM points
        WHERE lat = %s and lon = %s;""")
        cursor.execute(query, (lat, lon))
        row = cursor.fetchone()
        id_point = row[0]
        today_date = datetime.now().date()
        query = sql.SQL("""
        SELECT id, status
        FROM information_point
        WHERE DATE(ts_1) = %s and id_point = %s
        """)
        cursor.execute(query, (today_date, id_point))
        row = cursor.fetchone()
        if row is None:
            query = sql.SQL(
                """INSERT INTO information_point (id_point, containers, ts_1, ts_2, 
                photo_1, photo_2, other_trash, status)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""")
            cursor.execute(query,
                           (id_point, containers, ts, ts, photo, "", other_trash, "in_process"))
        else:
            query = sql.SQL(
                """UPDATE information_point 
SET 
    ts_2 = %s,
    photo_2 = %s,
    other_trash = %s,
    status = %s
WHERE id = %s;""")
            cursor.execute(query, (
                ts, photo, other_trash, "see" if status != "bad" else "bad", row[0]))

        query = sql.SQL(
            """UPDATE points 
SET 
last_ts = %s,
problems = (
    SELECT status 
    FROM information_point 
    WHERE id_point = points.id 
    ORDER BY ts_2 DESC 
    LIMIT 1
)
WHERE id = %s;""")
        cursor.execute(query, (ts, id_point))

        connection.commit()
        logger.info("Created successfully")
        return 1
    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


from aiogram import Bot, Dispatcher
from aiogram.types import Message, InputFile, FSInputFile, BufferedInputFile
from aiogram.filters import Command
from config import TOKEN_TG
import base64
import io

bot = Bot(token=TOKEN_TG)
dp = Dispatcher()


@dp.message(Command("start"))
async def start(message: Message):
    await add_tg_user(message.from_user.id)
    await message.answer(
        "Привет, мы команда MISIS GoGoRiki😁\nМы будем отправлять тебе сообщения о появившемся несанкционированном мусоре")


async def add_garbage(address, lat, lon, ts, photo, status):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        query = sql.SQL("""SELECT id
        FROM garbage
        WHERE lat = %s and lon = %s;""")
        cursor.execute(query, (lat, lon))
        row = cursor.fetchone()
        if row is None:
            query = sql.SQL(
                """INSERT INTO garbage (address, lat, lon, ts_1, ts_2,
                photo_1, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s);""")
            cursor.execute(query,
                           (address, lat, lon, ts, ts, photo, status))

            get_ids = sql.SQL("""SELECT id_tg
                    FROM tg_users
                    """)
            cursor.execute(get_ids, (lat, lon))
            ids = cursor.fetchall()

            for id_tg in ids:
                base64_image = photo
                image_data = base64.b64decode(base64_image)

                image_stream = io.BytesIO(image_data)

                photo_tg = BufferedInputFile(image_stream.read(),
                                             filename="image.png")  # Замените на правильное расширение

                await bot.send_photo(chat_id=id_tg[0], photo=photo_tg, caption=f"По адресу {address} ({lat}, {lon})\nПоявилась несанкционированная свалка мусора {ts}\n\nНужно принять меры!")

        else:
            query = sql.SQL(
                """update garbage
                set ts_2 = %s, photo_2 = %s, status = %s
                where id = %s;
                """
            )
            cursor.execute(query, (ts, photo, status, row[0]))

        query = sql.SQL(
            """update points
            set problems = %s
            where lat = %s and lon = %s;
            """
        )
        cursor.execute(query, ("garbage", lat, lon,))

        connection.commit()
        logger.info("Created successfully")

        return 1
    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


async def id_points_by_days(time_start, time_end):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        get_user_query = sql.SQL("""
        SELECT id, id_point, status FROM information_point WHERE date(ts_1) >= date(%s) and date(ts_2) <= date(%s);
        """)
        cursor.execute(get_user_query, (time_start, time_end))

        rows = cursor.fetchall()

        points = [{"id_inf": row[0], "id_point": row[1], "status": row[2]
                   } for row in rows]

        logger.info("Database fetched successfully")
        return points

    except (Exception, psycopg2.DatabaseError) as error:

        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


# =========================================users
async def get_user(user_id):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        get_user_query = sql.SQL("""
        SELECT name, email FROM users WHERE id = %s
        """)
        cursor.execute(get_user_query, (user_id,))

        row = cursor.fetchone()

        users = {"name": row[0], "email": row[1]}

        logger.info("Database fetched successfully")
        return users

    except (Exception, psycopg2.DatabaseError) as error:

        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')
            # logger.debug("-" * 40)


async def create_user(login, password, name) -> int:
    connection = db_connection()
    cursor = connection.cursor()

    hashed_pwd = hashlib.sha256(password.encode()).hexdigest()

    try:
        create_user_query = sql.SQL("""
            INSERT INTO users (email, hashed_pwd, name) VALUES (%s, %s, %s) returning id
            """)
        cursor.execute(create_user_query, (login, hashed_pwd, name))

        user_id = cursor.fetchone()

        connection.commit()
        logger.info("Created user successfully")
        return user_id

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')
            # logger.debug("-" * 40)


async def login_user(login, password):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        login_user_query = sql.SQL("""
            SELECT id, hashed_pwd FROM users WHERE email = %s
            """)
        cursor.execute(login_user_query, (login,))

        row = cursor.fetchone()

        users = {"id": row[0], "hashed_pwd": row[1]}

        hashed_pwd = hashlib.sha256(password.encode()).hexdigest()

        if hashed_pwd == users["hashed_pwd"]:
            connection.commit()
            logger.info("Login successful")
            return users["id"]
        else:
            logger.error("Invalid password")
            return None

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


async def get_statistic_container(data):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        query = sql.SQL("""SELECT problems FROM points WHERE Date(last_ts) = %s""")
        cursor.execute(query, (data,))
        rows = cursor.fetchall()
        static = {
            "see": 0,
            "bad": 0,
            "no_see": 0,
        }
        for row in rows:
            status = row[0]
            if status == "see":
                static["see"] += 1
            elif status == "bad" or status == "in_process":
                static["bad"] += 1
            elif status == "no_see" or status == "old":
                static["no_see"] += 1
        return static

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


async def get_statistic_container_solve(data):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        day_ago = data - timedelta(days=1)
        query = sql.SQL("""SELECT id_point, status FROM information_point WHERE Date(ts_1) = %s""")
        cursor.execute(query, (data,))
        rows = cursor.fetchall()
        static = {
            "error": 0,
            "solve": 0,
        }
        for row in rows:
            id_point = row[0]
            status = row[1]
            query = sql.SQL("""SELECT status FROM information_point WHERE Date(ts_1) = %s and id_point = %s""")
            cursor.execute(query, (day_ago, id_point,))
            row = cursor.fetchone()
            if row is None:
                continue
            status_ago = row[0]
            if status_ago == "see" and (status == "bad" or status == "old" or status == "in_process"):
                static["error"] += 1
            elif status == "see" and (
                    status_ago == "bad" or status_ago == "old" or status_ago == "in_process" or status == "no_see"):
                static["solve"] += 1

        return static

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


async def get_statistic_solve(data):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        query = sql.SQL("""SELECT status FROM garbage WHERE Date(ts_1) = %s""")
        cursor.execute(query, (data,))
        rows = cursor.fetchall()
        static = {
            "error": 0,
            "solve": 0,
        }
        for row in rows:
            status = row[0]
            if status == "have":
                static["error"] += 1

        query = sql.SQL("""SELECT status FROM garbage WHERE Date(ts_2) = %s""")
        cursor.execute(query, (data,))
        rows = cursor.fetchall()
        for row in rows:
            status = row[0]
            if status == "solve":
                static["solve"] += 1
        return static

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')



async def get_report_today(lat, lon):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        get_id_ts_query = sql.SQL("""
                SELECT id, last_ts, address from points
                WHERE lat=%s and lon=%s;
                """)
        cursor.execute(get_id_ts_query, (lat, lon,))

        row = cursor.fetchone()
        point_id = row[0]
        last_ts = row[1]
        address = row[2]

        get_last_data = sql.SQL("""
                SELECT containers, other_trash, status, photo_1, photo_2 from information_point
                WHERE id_point=%s and (ts_1=%s or ts_2=%s);
        """)
        cursor.execute(get_last_data, (point_id, last_ts, last_ts,))

        data_row = cursor.fetchone()
        report_data = {"address": address, "containers": data_row[0], "other_trash": data_row[1], "status": data_row[2],
                       "photo_1": data_row[3], "photo_2": data_row[4]}
        return report_data


    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


async def get_report_in_day(lat, lon, data):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        get_id_ts_query = sql.SQL("""
                SELECT id, address from points
                WHERE lat=%s and lon=%s;
                """)
        cursor.execute(get_id_ts_query, (lat, lon,))
        row = cursor.fetchone()
        point_id = row[0]
        address = row[1]

        get_last_data = sql.SQL("""
                        SELECT containers, other_trash, status, photo_1, photo_2 from information_point
                        WHERE id_point=%s and date(ts_1)=%s;
                """)
        cursor.execute(get_last_data, (point_id, data,))

        data_row = cursor.fetchone()
        report_data = {"address": address, "containers": data_row[0], "other_trash": data_row[1], "status": data_row[2],
                       "photo_1": data_row[3], "photo_2": data_row[4]}
        return report_data


    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


async def get_report_period(lat, lon, ts_1, ts_2):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        get_id_ts_query = sql.SQL("""
                    SELECT id, last_ts from points
                    WHERE lat=%s and lon=%s;
                    """)
        cursor.execute(get_id_ts_query, (lat, lon))

        row = cursor.fetchone()

        point_id = row[0]
        last_ts = row[1]

        get_last_data = sql.SQL("""
                    SELECT containers, other_trash, status from information_point
                    WHERE id_point=%s and (ts_1=%s or ts_2=%s);
            """)
        cursor.execute(get_last_data, (point_id, last_ts, last_ts,))

        data_row = cursor.fetchone()

        report_data = {"containers": data_row[0], "other_trash": data_row[1], "status": data_row[2]}

        return report_data


    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


async def add_tg_user(id_tg):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        get_all_users_query = sql.SQL("""
            select id_tg from tg_users;
            """)

        cursor.execute(get_all_users_query)
        usr_list = cursor.fetchall()
        usrs = [i[0] for i in usr_list]

        if id_tg not in usrs:
            create_user_query = sql.SQL("""
                INSERT INTO tg_users (id_tg) VALUES (%s)
                """)
            cursor.execute(create_user_query, (id_tg,))

            connection.commit()
            logger.info("Add tg user successfully")

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')

add_tg_user(976008787)