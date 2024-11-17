FROM python:3.12.3

WORKDIR /ml_n_back

COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update && apt-get install -y ffmpeg libsm6 libxext6
RUN pip install -U opencv-python-headless
RUN apt-get update && apt-get install -y libgl1 libglib2.0-0

COPY ./ ./



CMD ["python", "main.py"]
