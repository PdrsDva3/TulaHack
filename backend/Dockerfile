FROM python:3.12-slim

WORKDIR /backend

COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY ./ ./


WORKDIR /backend
CMD ["python", "db/migration.py/"]
CMD ["python", "main.py"]
