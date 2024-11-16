import json
import time
from datetime import datetime

from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db.db import get_point_information_by_id, get_all_points, add_point_information, create_user, \
    get_point_by_coordinates, get_user, login_user

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5713",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


points_router = APIRouter()

@points_router.get("/point/all")
async def get_all_points_h():
    all_points = await get_all_points()
    if not all_points:
        raise HTTPException(status_code=418, detail="i am a teapot ;)")
    return all_points


@points_router.get("/point/{point_id}")
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


@points_router.post("/point")
async def create_point(data: PointData):
    point = data.dict()
    point1 = await get_point_by_coordinates(point["address"], point["lat"], point["lon"])
    if not point1:
        raise HTTPException(status_code=418, detail="i am a teapot ;)")

    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    ret = await add_point_information(
        point['address'],
        point['lat'],
        point['lon'],
        point1['problems'],
        json.dumps({"какие-то": "данные от мл"}),
        current_time,
        point['photo'],
        0,
        ''
    )
    if not ret:
        raise HTTPException(status_code=418, detail="i am a teapot ;)")
    return "succes"

app.include_router(points_router, prefix="/point", tags=["point"])

# ======================users

user_router = APIRouter()


@user_router.get("/user/{user_id}")
async def get_user_h(user_id: int):
    user = await get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@user_router.post("/user/registration")
async def create_user_h(email: str, password: str, name: str):
    user_id = await create_user(email, password, name)
    if user_id is None:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    return user_id


@user_router.post("/user/login")
async def login_user_h(email: str, password: str):
    user_id = await login_user(email, password)
    if user_id is None:
        raise HTTPException(status_code=404, detail="Invalid login or password")
    return user_id


app.include_router(user_router, prefix="/user", tags=["user"])
