import cv2
import numpy as np
import matplotlib.pyplot as plt
import os
from scipy import ndimage
import math
from skimage.feature import local_binary_pattern
from skimage.util import view_as_windows
from skimage import io, color
import json
import base64

def kullback_leibler_divergence(dist_p, dist_q):
    '''
    Method compare two probability distributions
    and provide a score of similarity
    :param dist_p: target distribution to compare against
    :param dist_q: comparative distribution
    :return: standardised score determining similarity between distributions
    '''
    p = np.asarray(dist_p)
    q = np.asarray(dist_q)
    # provide number of instances where q and p are the same 
    filt = np.logical_and(p != 0, q != 0)
    # p[filt] provides prob of p multipled by prob of q
    # given p == prob of p, given q
    # Sum to gain overall prob / predictive power
    # p÷q is the likelihood ratio in binary and logBase standardises around 0
    return np.sum(p[filt] * np.log2(p[filt] / q[filt]))

def hist(axis, lbp):
    '''
    Create a histogram
    :param axis: matplotlib axes
    :param lbp: ndarray local binary pattern representation of an image
    :return: matplotliob histogram
    '''
    n_bins = int(lbp.max() + 1) # number of bins based on number of different values in lbp
    return axis.hist(lbp.ravel(), density=True, bins=n_bins, range=(0, n_bins), facecolor='0.5') 

if __name__ == "__main__":

    # print(image_to_base64(depthview_path))

    # Read the original image
    img = cv2.imread(r"C:\Users\jiayi\OneDrive\Documents\Meta\carpetDetection\photos\pattern_1.jpg",flags=0)
    # img = cv2.imread('../photos/standup_carpet2.png',flags=0)
    # img = cv2.imread('../photos/plain.jpg',flags=0)

    if img is None:
        print("Error: Unable to load image")

    # Blur the image for better edge detection
    img_blur = cv2.GaussianBlur(img,(3,3), sigmaX=0, sigmaY=0) 

    edges = cv2.Canny(image=img_blur, threshold1=100, threshold2=200) 

    # Get the dimensions of the image
    height, width = edges.shape
    print("Dimension:", height,width)

    # Set a threshold for edge intensity
    # You can adjust this threshold value

    # Count the number of edge pixels above the threshold
    edge_count = len(edges[edges > 0])
            
    print("Edge count:", edge_count)

    # Get the total number of pixels in the image
    total_pixels = edges.size
    print("Total pixels:", total_pixels)

    # Calculate the ratio of above_threshold_count to total_pixels
    edge_density = edge_count / total_pixels

    # Normalise the edge ratio by multiplying 10 so that it's between 0 to 10
    normalized_edge_ratio = edge_density

    print("Edge density:", normalized_edge_ratio)
    
    if normalized_edge_ratio < 0.1:
        print("----> No pattern detected in the image")
        exit()

    # Parameters
    height_patch = height * 0.3
    width_patch = width * 0.3
    step_size = math.floor(min(height, width) * 0.2)
    radius = 1
    n_points = 8
    patch_size = (height_patch, width_patch)  # Size of patches
    step = step_size  # Patch step

   # Create overlapping patches using view_as_windows
    patches = view_as_windows(img, patch_size, step_size)
    print(patches.shape)

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
    fig, axes = plt.subplots(num_rows, num_cols, figsize=(12, 12))

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
    print("Mean KL Divergence:", mean_kl_divergence)

    if mean_kl_divergence < 0.1:
        print("----> Pattern detected in the image")
    else:
        print("----> No pattern detected in the image")




