import cv2
import numpy as np
import math
from skimage.feature import local_binary_pattern
from skimage.util import view_as_windows
from flask import Flask, request, jsonify
import matplotlib.pyplot as plt
import base64

app = Flask(__name__)

def kullback_leibler_divergence(dist_p, dist_q):
    p = np.asarray(dist_p)
    q = np.asarray(dist_q)
    filt = np.logical_and(p != 0, q != 0)
    return np.sum(p[filt] * np.log2(p[filt] / q[filt]))

def hist(axis, lbp):
    n_bins = int(lbp.max() + 1)
    return axis.hist(lbp.ravel(), density=True, bins=n_bins, range=(0, n_bins), facecolor='0.5')

@app.route('/')
def test():
    return "Server is running"

@app.route('/detect_pattern', methods=['POST'])
def detect_pattern():
    # Receive base64-encoded image from request
    data = request.get_json()
    if 'image_base64' not in data:
        return jsonify({'error': 'No base64-encoded image provided'})

    # Decode base64 string to image array
    base64_image = data['image_base64']
    try:
        image_data = base64.b64decode(base64_image)
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
    except Exception as e:
        return jsonify({'error': 'Invalid base64-encoded image'})

    if img is None:
        return jsonify({'error': 'Unable to decode image'})

    # Blur the image for better edge detection
    img_blur = cv2.GaussianBlur(img,(3,3), sigmaX=0, sigmaY=0) 

    edges = cv2.Canny(image=img_blur, threshold1=100, threshold2=200) 

    # Get the dimensions of the image
    height, width = edges.shape


    # Count the number of edge pixels above the threshold
    edge_count = len(edges[edges > 0])
            
    # Get the total number of pixels in the image
    total_pixels = edges.size

    # Calculate the ratio of above_threshold_count to total_pixels
    edge_density = edge_count / total_pixels

    # Normalise the edge ratio by multiplying 10 so that it's between 0 to 10
    normalized_edge_ratio = edge_density
    
    if normalized_edge_ratio < 0.1:
        return jsonify({'message': 'No pattern detected', 'edge_density': edge_density})

    # Parameters
    height_patch = height * 0.3
    width_patch = width * 0.3
    step_size = math.floor(min(height, width) * 0.2)
    radius = 1
    n_points = 8
    patch_size = (height_patch, width_patch)  # Size of patches

   # Create overlapping patches using view_as_windows
    patches = view_as_windows(img, patch_size, step_size)

    # Define the number of rows and columns for subplots
    num_rows = patches.shape[0]
    num_cols = patches.shape[1]

    # Create a figure and a grid of subplots
    fig, axes = plt.subplots(num_rows, num_cols, figsize=(15, 15))

    for i in range(patches.shape[0]):
        for j in range(patches.shape[1]):
            patch = patches[i, j]
            
            # Display the patch as an image
            axes[i, j].imshow(patch, cmap='gray')
            axes[i, j].axis('off')  # Turn off axis labels

    histograms = []

    for i in range(patches.shape[0]):
        for j in range(patches.shape[1]):
            patch = patches[i, j]

            # Calculate LBP pattern for the patch
            lbp_img = local_binary_pattern(patch, n_points, radius, method='uniform')
            
            # Plot histogram of LBP of textures
            ax = axes[i, j]
            hist_values = hist(ax, lbp_img)
            
            histograms.append(hist_values)

    num_histograms = len(histograms)
    kl_divergence_values = []

    # Compare all combinations of histograms using nested loops
    for i in range(num_histograms):
        for j in range(i + 1, num_histograms):  # Avoid self-comparison and repetitions
            kl_value = kullback_leibler_divergence(histograms[i][0], histograms[j][0])
            kl_divergence_values.append(kl_value)

    # Calculate the mean of the KL Divergence values
    mean_kl_divergence = np.mean(kl_divergence_values)

    if mean_kl_divergence < 0.1:
        return jsonify({'message': 'Pattern detected', 'mean_kl_divergence': mean_kl_divergence, 'edge_density': edge_density})
    else:
        return jsonify({'message': 'No pattern detected', 'mean_kl_divergence': mean_kl_divergence, 'edge_density': edge_density})

if __name__ == '__main__':
    app.run(debug=True)
