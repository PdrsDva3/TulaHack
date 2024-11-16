import json
import time
from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db.db import get_point_information_by_id, get_all_points, add_point_information
from db import db

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

@app.get("/points/all")
async def get_all_points_h():
    all_points = await get_all_points()
    if not all_points:
        raise HTTPException(status_code=418, detail="i am a teapot ;)")
    return all_points


@app.get("/points/{point_id}")
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


@app.post("/point")
async def create_point(data: PointData):
    point = data.dict()
    point1 = await db.get_point_by_coordinates(point["address"], point["lat"], point["lon"])
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
