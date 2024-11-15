import json
import time

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.db.db import get_point_by_id, get_all_points, add_point_information

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
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


@app.get("/points/{id}")
async def get_point_info(point_id: int):
    point = await get_point_by_id(point_id)
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
    last_ts: str
    problems: bool
    containers: Dict[str, Any]
    ts_1: str
    ts_2: str
    photo_1: str
    photo_2: str
    other_trash: int
    status: str

    class Config:
        arbitrary_types_allowed = True


@app.post("/point")
async def create_point(data: PointData):
    point_data = data.dict()
    ret = await add_point_information(
        point_data['address'],
        point_data['lat'],
        point_data['lon'],
        point_data['last_ts'],
        point_data['problems'],
        json.dumps(point_data['containers']),
        point_data['ts_1'],
        point_data['ts_2'],
        point_data['photo_1'],
        point_data['photo_2'],
        point_data['other_trash'],
        point_data['status']
    )
    if not ret:
        raise HTTPException(status_code=418, detail="i am a teapot ;)")
    return "succes"
