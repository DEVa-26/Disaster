import numpy as np
import threading
import time
from scipy.optimize import linprog
from disaster import load_model, predict_image, class_labels, severity_labels
import torch

# Load the trained model
model_path = r"C:\Users\admin\Desktop\MiniProject\Project\project\models\chk_model.pth"  # Update the correct path if needed
model, device = load_model(model_path)

# Define resource limits
resources = {
    "ambulance": 200,
    "fire truck": 80,
    "helicopter rescue": 10,
    "earth movers": 120,
    "search and rescue": 350,
    "first aid teams": 250,
    "rescue boats": 40
}

# Priority allocation matrix
allocation_matrix = np.array([
    [60,  0,  50, 80, 80,  80,  0],  # Earthquake
    [10,  0,  80,  0, 80, 50, 80],  # Flood
    [50,  0,  50, 40, 80, 80, 50],  # Hurricane
    [70, 80,  20,  0, 50, 80,  0],  # Fire
    [50,  0,  30, 80, 70, 70,  0]   # Landslide
])

severity_scale = {"Little to None": 0.1, "Mild": 0.4, "Severe": 0.8}

# Function to restore resources
def restore_resources(allocated_resources):
    time.sleep(30)
    for resource, amount in allocated_resources.items():
        resources[resource] += amount
    print("\n✅ Resources restored after usage!\n")

# Allocate resources dynamically
def allocate_resources(image_path):
    prediction = predict_image(model, image_path, device, class_labels, severity_labels)
    
    disaster_type = prediction["type"]
    severity_level = prediction["severity"]

    if disaster_type == "Not a disaster":
        print("❌ No disaster detected, no resources allocated.")
        return
    
    severity_factor = severity_scale[severity_level]
    scaled_priority = allocation_matrix[list(class_labels.values()).index(disaster_type)]
    
    c = -scaled_priority
    bounds = [(0, severity_factor * resources[res]) for res in resources.keys()]
    
    result = linprog(c, bounds=bounds, method="highs-ds")
    
    if result.success:
        allocated_resources = result.x
        allocated_dict = {}

        print(f"\n🚨 Resource Allocation for {disaster_type} ({severity_level} Severity):")
        for i, resource in enumerate(resources.keys()):
            allocated = int(round(allocated_resources[i]))
            resources[resource] -= allocated
            allocated_dict[resource] = allocated
            print(f"  - {resource}: {allocated} (Remaining: {resources[resource]})")

        threading.Thread(target=restore_resources, args=(allocated_dict,)).start()
    else:
        print("⚠️ Optimization Failed!")