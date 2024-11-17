"""start in this file"""
import asyncio

import uvicorn

import db.migration
from app.app import app
from db.db import bot, dp
import db.db


async def start_bot():
    await dp.start_polling(bot)


async def start_api():
    config = uvicorn.Config(app, host="0.0.0.0", port=8000)
    server = uvicorn.Server(config)
    await server.serve()


async def main():
    await asyncio.gather(
        start_bot(),  # Запуск бота
        start_api()  # Запуск FastAPI
    )


if __name__ == '__main__':
    db.migration.migration_up()
    asyncio.run(main())

