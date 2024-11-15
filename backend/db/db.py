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
        query = sql.SQL("""
        SELECT id, address, lat, lon, last_ts, problems FROM points
        """)
        cursor.execute(query)

        rows = cursor.fetchall()

        points = [
            {"id": row[0], "address": row[1], "lat": row[2], "lon": row[3], "last_ts": row[4], "problems": row[5]}
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


async def get_point_by_id(id_point):
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
order by ts_1;
        """)
        cursor.execute(query, (id_point,))

        row1 = cursor.fetchone()

        point = {"id": row[0], "address": row[1], "lat": row[2], "lon": row[3], "last_ts": row[4], "problems": row[5],
                 "containers": row1[0], "ts_1": row1[1], "ts_2": row1[2], "photo_1": row1[3], "photo_2": row1[4],
                 "other_trash": row1[5], "status": row1[6]}

        logger.info("Database fetched successfully")
        print(row)
        print(point)
        return point

    except (Exception, psycopg2.DatabaseError) as error:
        logger.error(error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            logger.info('Database connection closed.')


async def add_point_information(address, lat, lon, last_ts, problems, containers, ts_1, ts_2, photo_1, photo_2,
                                other_trash, status):
    connection = db_connection()
    cursor = connection.cursor()

    try:
        query = sql.SQL("""SELECT id
        FROM points
        WHERE lat = %s and lon = %s;""")
        cursor.execute(query, (lat, lon))

        row = cursor.fetchone()
        if row is None:
            query = sql.SQL("""
                        INSERT INTO points (address, lat, lon, last_ts, problems) VALUES (%s, %s, %s, %s, %s) RETURNING id;""")
            cursor.execute(query, (address, lat, lon, last_ts, problems))
            id = cursor.fetchone()[0]
        else:
            id = row[0]

        query = sql.SQL("""
            INSERT INTO information_point (id_point, containers, ts_1, ts_2, photo_1, photo_2, other_trash, status) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""")
        cursor.execute(query, (id, containers, ts_1, ts_2, photo_1, photo_2, other_trash, status))

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
