<br />
<div align="center">
    <img src="./frontend/public/tula.svg" alt="Logo" width="80" >
<h3 align="center">Экология: Мониторинг состояния контейнерных площадок</h3>
<h4>MISIS GogoRiki</h4>
  <p align="center">
    Чистота и удобство!
    <br>
    <a href="https://www.figma.com/design/mvxSqON2dbA4eldvHYSYrP/Tula?node-id=0-1&t=7iQSe86XgrCLDJSr-1" target="_blank"><strong>Презентация »</strong></a>
    <br />
    <strike><strong>Попробовать »</strong></strike>
    <br />
    </p>
</div>

<br>

<div align="center">
    <img src="https://img.shields.io/badge/typescript-323330?style=for-the-badge&logo=typescript&logoColor=blue"/>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
    <img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue"/>
    <img src="https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=FASTAPI&logoColor=white"/>
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
    <img src="https://img.shields.io/badge/OpenCV-20232A?style=for-the-badge&logo=opencv&logoColor=5C3EE8"/>
    <img src="https://img.shields.io/badge/tesseract-1c6ac2?style=for-the-badge"/>
    <img src="https://img.shields.io/badge/yolo_v11-7B23B3?style=for-the-badge"/>
    <img src="https://img.shields.io/badge/yandexmap-323330?style=for-the-badge"/>
</div>

# Цель проекта

Создание платформы для мониторинга контейнерных площадок и составления отчетов на базе
искусственного интеллекта

# О Проекте

Наша команда представляет платформу для автоматического выявления объектов на контейнерных 
площадках.
Более того, наше решение автоматизировало формирование отчетностей, а мощные модели машинного
обучения позволяют проводить анализ в режиме реального времени для отображения статистики.
Благодаря интуитивно понятному интерфейсу сотрудник сможет на порядок быстрее
реагировать на возникшие проблемы и контролировать оперативность их устранения, а система 
составления отчетов позволит в
краткой форме узнать основные сведения о точке за заданный период.

Стек решения: Python, fastapi, YOLOv11, YandexGPT, TypeScript, ReactJS и др.

Уникальность нашего решения в том, что мы используем модели разного типа, что в совокупности
создает сильный инструмент для мониторинга и анализа.

## Функционал

- [ ] Деплой на сервер
- [x] Авторизация
- [x] Страница со всеми разделами

- [ ] Разделы
    - [x] Авторизация
    - [x] Мониторинг
    - [x] Статистика
    - [ ] Календарь отчетов

- [x] Ассистент
    - [x] Внедрение модели
    - [x] Генерация текста на основе запроса
    - [x] Составление краткого отчета на основе данных и возможность скачать его

- [x] Модель
    - [x] Статистика
    - [x] Аналитика
    - [ ] Детекция:
    - [x] Разметка train dataset
    - [x] Fine-tuning YOLO-v11 на 1к train_dataset
    - [x] Fine-tuning YOLO-v11 на 6к train_dataset
    - [ ] OCR (tesseract)
    - [ ] Формирование логов
