import hashlib
import time
from datetime import datetime, timedelta

import psycopg2
from psycopg2 import sql
import logging

from db.migration import db_connection, db_config

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

    try:
        three_days_ago = datetime.now().date() - timedelta(days=3)
        query = sql.SQL("""
        SELECT id, address, lat, lon, last_ts, problems FROM points
        """)
        cursor.execute(query)

        rows = cursor.fetchall()

        points = [
            {"id": row[0], "address": row[1], "lat": row[2], "lon": row[3], "last_ts": row[4],
             "problems": row[5] if three_days_ago < row[4].date() else "old"}
            for row in rows
        ]

        logger.info("Database fetched successfully")
        return points

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
        id_point = row
        today_date = datetime.now().date()
        query = sql.SQL("""
        SELECT id
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
            cursor.execute(query, (id_point, containers, ts, ts, photo, "", other_trash, status))
        else:
            query = sql.SQL(
                """UPDATE information_point 
SET 
    ts_2 = %s,
    photo_2 = %s,
    other_trash = %s,
    status = %s
WHERE id = %s;""")
            cursor.execute(query, (ts, photo, other_trash, status, row[0]))

        query = sql.SQL(
            """UPDATE points 
SET 
last_ts = %s
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


async def create_user(login, password, name):
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
