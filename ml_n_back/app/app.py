import json
import time
from datetime import datetime, timedelta

from docx import Document
from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db.db import get_point_information_by_id, get_all_points, add_point_information, create_user, \
    get_point_by_coordinates, get_user, login_user, get_statistic_container, get_statistic_container_solve
from db.db import get_point_information_by_id, get_all_points, add_point_information, create_user, get_point_by_coordinates, get_user, login_user, get_report_today

import os
import uuid
from fastapi.responses import FileResponse

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

points_router = APIRouter()


@points_router.get("/all")
async def get_all_points_h():
    all_points = await get_all_points()
    if not all_points:
        raise HTTPException(status_code=418, detail="i am a teapot ;)")
    return all_points


@points_router.get("/{point_id}")
async def get_point_info(point_id: int):
    point = await get_point_information_by_id(point_id)
    if not point:
        raise HTTPException(status_code=404, detail="Invalid ID")
    return point


from typing import Dict, Any


class ItemRequest(BaseModel):
    name: str
    data: Dict[str, Any]

    class Config:
        arbitrary_types_allowed = True


class PointData(BaseModel):
    address: str
    lat: str
    lon: str
    photo: str

    class Config:
        arbitrary_types_allowed = True


@points_router.post("/add")
async def create_point(data: PointData):
    point = data.dict()
    point1 = await get_point_by_coordinates(point["address"], point["lat"], point["lon"])
    if not point1:
        raise HTTPException(status_code=418, detail="i am a teapot ;)")

    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    from inference import predict

    photo, prediction = predict(point["photo"])

    out = dict()
    for k, v in prediction.items():
        if v != 0:
            out[k] = v

    ret = await add_point_information(
        point['address'],
        point['lat'],
        point['lon'],
        point1['problems'],
        json.dumps(out),
        current_time,
        photo,
        prediction["garbage"],
        'bad' if prediction["garbage"] else ''
    )
    if not ret:
        raise HTTPException(status_code=418, detail="i am a teapot ;)")
    return "succes"


app.include_router(points_router, prefix="/point", tags=["point"])

# ======================users

user_router = APIRouter()


@user_router.get("/{user_id}")
async def get_user_h(user_id: int):
    user = await get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


class RegUsr(BaseModel):
    email: str
    password: str
    name: str

    class Config:
        arbitrary_types_allowed = True


@user_router.post("/registration")
async def create_user_h(data: RegUsr):
    user = data.dict()
    user_id = await create_user(user["email"], user["password"], user["name"])
    if user_id is None:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    return user_id[0]


@user_router.post("/login")
async def login_user_h(email: str, password: str):
    user_id = await login_user(email, password)
    if user_id is None:
        raise HTTPException(status_code=404, detail="Invalid login or password")
    return user_id


app.include_router(user_router, prefix="/user", tags=["user"])


def create_docx(data):
    doc = Document()
    doc.add_heading('Data Report Today', 0)

    for item in data:
        doc.add_paragraph(f'Name: {item.name}, Value: {item.value}')

    unique_filename = f"{uuid.uuid4().hex}_report.docx"
    file_path = os.path.join("/tmp", unique_filename)
    doc.save(file_path)

    return file_path


report_router = APIRouter()

class ReportToday(BaseModel):
    lat: str
    lon: str

    class Config:
        arbitrary_types_allowed = True

async def create_file(lat, lon):
    data = await get_report_today(lat, lon)
    doc = Document()
    # Добавляем заголовок
    doc.add_heading('Отчет по контейнерной площадке', 0)
    # Добавляем информацию в документ
    doc.add_paragraph(f"Контейнерная площадка: {data['containers']['Place']}")
    doc.add_paragraph(f"Количество контейнеров на площадке: {data['containers']['Container']}")
    doc.add_paragraph(f"Количество мусора вне контейнера: {data['other_trash']}")
    doc.add_paragraph(f"Статус контейнерной площадки: {data['status']}")
    unique_filename = f"{uuid.uuid4().hex}_report.docx"
    os.getcwd()
    temp_file = os.path.join("temp")
    file_path = os.path.join(temp_file, unique_filename)
    doc.save(file_path)
    return file_path


@report_router.post("/today")
async def get_today(data: ReportToday):
    datas = data.dict()
    file_path = await create_file(datas['lat'], datas['lon'])
    if not file_path:
        raise HTTPException(status_code=404, detail="Can not generate file")

    return FileResponse(path=file_path, filename='Отчет_за_сегодня.docx', media_type='multipart/form-data')


class ReportPeriod(BaseModel):
    lat: str
    lon: str
    ts_1: str
    ts_2: str

    class Config:
        arbitrary_types_allowed = True


@report_router.get("/period")
async def get_period(data: ReportPeriod):
    data = data.dict()
    db_data = await get_report_period(data["lat"], data["lon"], data["ts_1"], data["ts_2"])

app.include_router(report_router, prefix="/report", tags=["report"])

# ======================statistic

statistic_router = APIRouter()
app.include_router(statistic_router, prefix="/statistic", tags=["statistic"])


class StatisticData(BaseModel):
    ts_1: str
    ts_2: str

    class Config:
        arbitrary_types_allowed = True


@statistic_router.post("container")
async def get_statistic(data: StatisticData):
    data = data.dict()
    ts1 = (datetime.strptime(data["ts_1"], "%Y-%m-%d %H:%M:%S")).date()

    ts2 = (datetime.strptime(data["ts_2"], "%Y-%m-%d %H:%M:%S")).date()

    statics = {
        "see": 0,
        "bad": 0,
        "no_see": 0,
    }

    while ts1 != ts2 + timedelta(days=1):
        static = await get_statistic_container(ts1)
        statics["see"] += static["see"]
        statics["bad"] += static["bad"]
        statics["no_see"] += static["no_see"]
        ts1 += timedelta(days=1)

    return statics

@statistic_router.post("solve")
async def get_statistic(data: StatisticData):
    data = data.dict()
    ts1 = (datetime.strptime(data["ts_1"], "%Y-%m-%d %H:%M:%S")).date()

    ts2 = (datetime.strptime(data["ts_2"], "%Y-%m-%d %H:%M:%S")).date()

    statics = {
            "error": 0,
            "solve": 0,
    }

    while ts1 != ts2 + timedelta(days=1):
        static = await get_statistic_container_solve(ts1)
        statics["error"] += static["error"]
        statics["solve"] += static["solve"]
        ts1 += timedelta(days=1)

    return statics

app.include_router(statistic_router, prefix="/statistic", tags=["statistic"])

