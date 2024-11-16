from ultralytics import YOLO
import cv2
import base64

model = YOLO("/Users/alexgorin/tula/TulaHack/ml/best.onnx")

objects = {
    "Bin": 0,  #контейнер с решеткой или отверстиями
    "Tank": 0, # очень большой контейнер 
    "Container": 0, #тут и так понятно
    "Place": 0, # место где стоят контейнеры
    "garbage": 0, # мусор
    "garbage_bin": 0, #это не нужно но если что - это тоже контейнер
    "overflow": 0, # заполненный/переполненный контейнер
    'Large': 0 #гора мусора вне зоны контейнеров
  }

label_dict = {0: 'Bin', 1: 'Container', 2: 'Large', 3: 'Place', 4: 'Tank', 5: 'garbage', 6: 'garbage_bin', 7: 'overflow'}

def count_labels(array):
    result = {}
    for item in array:
        label = label_dict.get(item, None)
        if label is not None:
            if label in result:
                result[label] += 1
            else:
                result[label] = 1
    return result

def predict(path_to_file):
  image = cv2.imread(path_to_file)
  annotated_image = image.copy()
  results = model(image)

  count = {}
  for el in label_dict.values():
      count[el] = 0
  tt = [int(el) for el in results[0].boxes.cls]
  cnt = count_labels(tt)
  for t in cnt:
      count[t]+=cnt[t]

  annotated_image = results[0].plot()
  _, buffer = cv2.imencode('.jpg', annotated_image)
  base64_frame = base64.b64encode(buffer).decode('utf-8')

predict("/Users/alexgorin/tula/TulaHack/ml/data/073300.jpg")