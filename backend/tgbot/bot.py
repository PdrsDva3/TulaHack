from aiogram.types import Message

from config import bot, dp

@dp.message_handler(commands=['start'])
async def start(message: Message):
    return