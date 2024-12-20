"""
Миграции
"""
import psycopg2
from psycopg2 import sql

import config

db_config = {
    'dbname': config.DB_NAME,
    'user': config.DB_USER,
    'password': config.DB_PASSWORD,
    'host': config.DB_HOST,
    'port': config.DB_PORT,
}


def db_connection():
    return psycopg2.connect(**db_config)


def migration_up():
    conn = db_connection()
    cur = conn.cursor()
    try:
        create = sql.SQL("""CREATE TABLE IF NOT EXISTS points
(
    id       serial NOT NULL PRIMARY KEY,
    address  varchar,
    lat      varchar,
    lon      varchar,
    last_ts  timestamp,
    problems varchar default 'no_see'
);


CREATE TABLE IF NOT EXISTS information_point
(
    id          serial NOT NULL PRIMARY KEY,
    id_point    int,
    containers  jsonb,
    ts_1        timestamp,
    ts_2        timestamp,
    photo_1     varchar,
    photo_2     varchar,
    other_trash int     default 0,
    status      varchar default 'no_see'
);

CREATE TABLE IF NOT EXISTS report
(
    id          serial not null primary key,
    id_point    int,
    ts          timestamp,
    containers  jsonb,
    photo       varchar,
    other_trash int     default 0,
    description varchar default ''
);


CREATE TABLE IF NOT EXISTS garbage
(
    id      serial NOT NULL PRIMARY KEY,
    address varchar,
    lat     varchar,
    lon     varchar,
    ts_1    timestamp,
    ts_2    timestamp,
    photo_1 varchar,
    photo_2 varchar,
    status  varchar default 'have'
);

CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email varchar,
            name VARCHAR,
            hashed_pwd VARCHAR
            );

CREATE TABLE IF NOT EXISTS statistic_points
(
    data timestamp,
    see int,
    have_problem int,
    no_see int
);

CREATE TABLE IF NOT EXISTS tg_users
(
    id_tg bigint
);
""")

        cur.execute(create)  # Выполняем запрос на создание таблицы
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        return error
    finally:
        if conn:
            cur.close()
            conn.close()


def migration_down():
    conn = db_connection()
    cur = conn.cursor()
    try:
        drop = sql.SQL("""DROP TABLE IF EXISTS points, information_point, report, garbage;""")

        cur.execute(drop)  # Выполняем запрос на создание таблицы
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        return error
    finally:
        if conn:
            cur.close()
            conn.close()





if __name__ == "__main__":
    migration_down()
    migration_up()
