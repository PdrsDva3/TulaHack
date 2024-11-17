import cv2
from inference_sdk import InferenceHTTPClient
from inference import get_model
import numpy as np
import supervision as sv
import os

def process_1():
  # Инициализация клиента
  CLIENT = InferenceHTTPClient(
      api_url="https://detect.roboflow.com",
      api_key="iw5rsm5nIrBVukwrjJcb"
  )

  model = get_model(model_id="-vqmac/1")

  source_folder = "/Users/alexgorin/tula/TulaHack/ml_n_back/data"
  target_folder = "/Users/alexgorin/tula/TulaHack/ml_n_back/processed"

  for root, dirs, files in os.walk(source_folder):
      # print(root, dirs, files)
      for file in files:  
        path_to_file = f"{root}/{file}"
        image = cv2.imread(path_to_file)

        # Выполнение инференса
        result = model.infer(path_to_file)[0]

        # load the results into the supervision Detections api
        detections = sv.Detections.from_inference(result)

        # create supervision annotators
        bounding_box_annotator = sv.BoxAnnotator()
        label_annotator = sv.LabelAnnotator()

        # annotate the image with our inference results
        annotated_image = bounding_box_annotator.annotate(
            scene=image, detections=detections)
        annotated_image = label_annotator.annotate(
            scene=annotated_image, detections=detections)

        cv2.imwrite(f"{target_folder}/{file}", annotated_image)




def process_2():
  # Инициализация клиента
  CLIENT = InferenceHTTPClient(
      api_url="https://detect.roboflow.com",
      api_key="iw5rsm5nIrBVukwrjJcb"
  )

  model = get_model(model_id="russian-garbage-detection/3")

  source_folder = "/Users/alexgorin/tula/TulaHack/ml_n_back/data"
  target_folder = "/Users/alexgorin/tula/TulaHack/ml_n_back/processed_1"

  for root, dirs, files in os.walk(source_folder):
      # print(root, dirs, files)
      for file in files:  
        path_to_file = f"{root}/{file}"
        image = cv2.imread(path_to_file)

        # Выполнение инференса
        result = model.infer(path_to_file)[0]

        # load the results into the supervision Detections api
        detections = sv.Detections.from_inference(result)

        # create supervision annotators
        bounding_box_annotator = sv.BoxAnnotator()
        label_annotator = sv.LabelAnnotator()

        # annotate the image with our inference results
        annotated_image = bounding_box_annotator.annotate(
            scene=image, detections=detections)
        annotated_image = label_annotator.annotate(
            scene=annotated_image, detections=detections)

        cv2.imwrite(f"{target_folder}/{file}", annotated_image)
        print("~~~")


def combine(path_to_file):
  # Инициализация клиента
  CLIENT = InferenceHTTPClient(
      api_url="https://detect.roboflow.com",
      api_key="iw5rsm5nIrBVukwrjJcb"
  )

  model_1 = get_model(model_id="russian-garbage-detection/3")
  model_2 = get_model(model_id="-vqmac/1")

  image = cv2.imread(path_to_file)

        # Выполнение инференса
  result_1 = model_1.infer(path_to_file)[0]
  result_2 = model_2.infer(path_to_file)[0]


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
       

  for i in dict(result_1)["predictions"]:
     print(dict(i)["class_name"])
     if (dict(i)["class_name"] in objects):
      objects[dict(i)["class_name"]]+=1
  
  for i in dict(result_2)["predictions"]:
     print(dict(i)["class_name"])
     if (dict(i)["class_name"] in objects):
      objects[dict(i)["class_name"]]+=1

  for i in objects:
     print(i, objects[i], end=" | ")

  # load the results into the supervision Detections api
  detections_1 = sv.Detections.from_inference(result_1)
  detections_2 = sv.Detections.from_inference(result_2)


  # create supervision annotators
  bounding_box_annotator = sv.BoxAnnotator()
  label_annotator = sv.LabelAnnotator()

  # annotate the image with our inference results
  annotated_image = bounding_box_annotator.annotate(
      scene=image, detections=detections_1)
  
  annotated_image = bounding_box_annotator.annotate(
      scene=image, detections=detections_2)

  annotated_image = label_annotator.annotate(
      scene=annotated_image, detections=detections_1)
  
  annotated_image = label_annotator.annotate(
      scene=annotated_image, detections=detections_2)

  sv.plot_image(annotated_image)
  print("~~~")