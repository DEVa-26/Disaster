import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models
import albumentations as A
from albumentations.pytorch import ToTensorV2
from PIL import Image
import numpy as np
import os

# 🔹 Data Preprocessing (Same as Training)
IMG_SIZE = (224, 224)
transform = A.Compose([
    A.Resize(IMG_SIZE[0], IMG_SIZE[1]),
    A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ToTensorV2(),
])

# 🔹 MultiTask Model Definition
class MultiTaskModel(nn.Module):
    def __init__(self, num_types, num_severity):
        super(MultiTaskModel, self).__init__()
        self.base_model = models.efficientnet_b3(pretrained=False)
        self.base_model.classifier = nn.Identity()
        self.classifier = nn.Sequential(
            nn.Linear(1536, 512),
            nn.ReLU(),
            nn.Dropout(p=0.4),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Dropout(p=0.3),
        )
        self.fc_type = nn.Linear(256, num_types)
        self.fc_severity = nn.Sequential(
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Dropout(p=0.3),
            nn.Linear(128, num_severity)
        )

    def forward(self, x):
        x = self.base_model(x)
        x = self.classifier(x)
        return self.fc_type(x), self.fc_severity(x)

# 🔹 Load the Model
def load_model(model_path, num_types=6, num_severity=3):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = MultiTaskModel(num_types, num_severity).to(device)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()
    return model, device

# 🔹 Preprocess Image
def preprocess_image(image):
    image = Image.open(image).convert("RGB")
    image = transform(image=np.array(image))["image"]
    return image.unsqueeze(0)

# 🔹 Predict Disaster Type & Severity
def predict_image(model, image, device, class_labels, severity_labels):
    image_tensor = preprocess_image(image).to(device)

    with torch.no_grad():
        outputs_type, outputs_severity = model(image_tensor)

    probabilities_type = F.softmax(outputs_type, dim=1)
    probabilities_severity = F.softmax(outputs_severity, dim=1)

    predicted_type = torch.argmax(probabilities_type, dim=1).item()
    predicted_severity = torch.argmax(probabilities_severity, dim=1).item()

    return {
        "type": class_labels.get(predicted_type, "Unknown"),
        "severity": severity_labels.get(predicted_severity, "Unknown"),
        "confidence": round(probabilities_type[0, predicted_type].item(), 4)
    }

# 🔹 Human-Readable Labels
class_labels = {0: "Earthquake", 1: "Flood", 2: "Hurricane", 3: "Fire", 4: "Landslide", 5: "Not a disaster"}
severity_labels = {0: "Little to None", 1: "Mild", 2: "Severe"}