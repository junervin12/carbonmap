# Reproducibility Guide

This document provides step-by-step instructions for reproducing the geospatial suitability mapping, machine learning baseline, and deep learning segmentation workflow used in this project.

## Project objective

The objective of this workflow is to map agro-industrial residue potential as feedstock for biomass-derived carbon nanomaterial production in West Java, Indonesia, using multi-source geospatial data, rule-based suitability modeling, machine learning baselines, and deep learning semantic segmentation.

## Computational environment

The workflow was developed using a combination of:

- Google Earth Engine for remote sensing data acquisition and export.
- Google Colab for Python-based geospatial processing, machine learning, and deep learning.
- QGIS for visual validation, map styling, layout design, and final figure export.

Recommended environment:

```text
Python >= 3.10
Google Colab GPU runtime for deep learning
QGIS >= 3.34 for cartographic layout
```

Install Python dependencies using either:

```bash
pip install -r requirements.txt
```

or:

```bash
conda env create -f environment.yml
conda activate geospatial-biomass-carbon
```

## Repository structure assumed by the notebooks

The notebooks assume the following Google Drive base directory:

```text
/content/drive/MyDrive/geospatial_biomass_carbon/
```

Recommended Google Drive layout:

```text
geospatial_biomass_carbon/
├── boundary_kabupaten_kota_jawa_barat_27_big.geojson
├── sentinel2_indices_jawa_barat_2024_scale50.tif
├── viirs_nighttime_lights_jawa_barat_2024.tif
├── esa_worldcover_jawa_barat.tif
├── cropland_mask_jawa_barat.tif
├── osm_major_roads_jawa_barat.geojson
├── agroindustry_facilities_jawa_barat_final.geojson
├── grid_suitability_jawa_barat_final.xlsx
├── grid_suitability_jawa_barat_final.gpkg
├── grid_suitability_jawa_barat_ml_prediction.xlsx
├── grid_suitability_jawa_barat_ml_prediction.gpkg
└── deep_learning/
```

Adjust paths in `config/config_template.yaml` or in each notebook if your directory structure differs.

## End-to-end notebook execution order

Run the notebooks in the following order.

### 00 — Export remote sensing layers from Google Earth Engine

Notebook/script:

```text
notebooks/00_gee_export_remote_sensing_layers.ipynb
scripts/gee_export_remote_sensing_layers.js
```

Purpose:

- Define the West Java study boundary.
- Export Sentinel-2 surface reflectance composite and spectral indices.
- Export VIIRS nighttime lights.
- Export ESA WorldCover and cropland mask.

Expected outputs:

```text
sentinel2_indices_jawa_barat_2024_scale50.tif
viirs_nighttime_lights_jawa_barat_2024.tif
esa_worldcover_jawa_barat.tif
cropland_mask_jawa_barat.tif
```

### 01 — Residue estimation and facility preprocessing

Notebook:

```text
notebooks/01_residue_estimation_and_facility_preprocessing.ipynb
```

Purpose:

- Process agricultural production statistics.
- Estimate commodity-wise residue potential.
- Clean and validate agro-industrial facility locations.
- Join residue data with district boundaries.

Expected outputs:

```text
crop_production_summary_2018_2022_with_residue_estimation.xlsx
residue_potential_district_map_2018_2022_big27.geojson
agroindustry_facilities_jawa_barat_final.xlsx
agroindustry_facilities_jawa_barat_final.geojson
```

### 02 — Create 1 km grid for West Java

Notebook:

```text
notebooks/02_create_1km_grid_west_java.ipynb
```

Purpose:

- Generate 1 km × 1 km spatial grid cells covering West Java.
- Assign district/city names to grid cells.
- Compute grid area, centroid coordinates, and coverage ratio.

Expected outputs:

```text
grid_1km_jawa_barat.geojson
grid_1km_jawa_barat.gpkg
grid_1km_jawa_barat_summary_by_district.csv
```

### 03 — Extract raster features to grid

Notebook:

```text
notebooks/03_extract_raster_features_to_grid.ipynb
```

Purpose:

- Extract zonal statistics from Sentinel-2, VIIRS, ESA WorldCover, and cropland mask to each grid cell.
- Generate tabular geospatial features for each 1 km grid cell.

Expected outputs:

```text
grid_1km_jawa_barat_with_raster_features.xlsx
grid_1km_jawa_barat_with_raster_features.gpkg
```

### 04 — Rule-based suitability and distance features

Notebook:

```text
notebooks/04_rule_based_suitability_and_distance_features.ipynb
```

Purpose:

- Calculate distance to major roads.
- Calculate distance to agro-industrial facilities.
- Calculate agro-industrial density features.
- Disaggregate district-level residue estimates to grid cells.
- Compute rule-based suitability score and suitability class.

Rule-based suitability formula:

```text
suitability_score_final =
0.40 × residue_score
+ 0.20 × agroindustry_proximity_score
+ 0.15 × road_accessibility_score
+ 0.10 × nighttime_light_score
+ 0.10 × cropland_score
+ 0.05 × environmental_score
```

Expected outputs:

```text
grid_suitability_jawa_barat_final.xlsx
grid_suitability_jawa_barat_final.gpkg
```

### 05 — Machine learning baseline suitability modeling

Notebook:

```text
notebooks/05_ml_baseline_suitability_modeling.ipynb
```

Purpose:

- Train machine learning baseline models using grid-level geospatial features.
- Evaluate regression and classification models.
- Generate ML-predicted suitability scores and classes.

Models:

```text
Random Forest
HistGradientBoosting
XGBoost
```

Expected outputs:

```text
grid_suitability_jawa_barat_ml_prediction.xlsx
grid_suitability_jawa_barat_ml_prediction.gpkg
dataset_audit_summary.xlsx
confusion_matrix_test.png
feature_importance_classification.png
```

### 06 — Prepare raster labels and patches for deep learning

Notebook:

```text
notebooks/06_dl01_prepare_raster_labels_and_patches.ipynb
```

Purpose:

- Rasterize grid-level suitability labels.
- Build input raster stack from multi-source geospatial features.
- Normalize raster bands.
- Generate patch dataset for semantic segmentation.

Expected outputs:

```text
deep_learning/DL_01_prepare_raster_labels_and_patches/input_stack_geospatial_features_raw.tif
deep_learning/DL_01_prepare_raster_labels_and_patches/label_potential_class_final.tif
deep_learning/DL_01_prepare_raster_labels_and_patches/label_suitability_score_final.tif
deep_learning/DL_01_prepare_raster_labels_and_patches/patch_dataset_classification_regression.npz
deep_learning/DL_01_prepare_raster_labels_and_patches/patch_metadata.csv
deep_learning/DL_01_prepare_raster_labels_and_patches/band_normalization_stats.csv
deep_learning/DL_01_prepare_raster_labels_and_patches/dl01_summary.xlsx
```

Default settings:

```text
Patch size: 128 × 128
Stride: 128
Minimum valid ratio: 0.60
Maximum selected patches: 2,500
Class nodata: 255
Score nodata: -9999
```

### 07 — Train U-Net and DeepLabV3+ geospatial segmentation models

Notebook:

```text
notebooks/07_dl02_train_unet_deeplabv3_geospatial.ipynb
```

Purpose:

- Train U-Net and DeepLabV3+ on the raster patch dataset.
- Evaluate segmentation performance using accuracy, macro-F1, and mean IoU.
- Export prediction raster and confidence raster.

Expected outputs:

```text
deep_learning/DL_02_train_unet_deeplabv3_geospatial/UNet_best.pth
deep_learning/DL_02_train_unet_deeplabv3_geospatial/DeepLabV3Plus_best.pth
deep_learning/DL_02_train_unet_deeplabv3_geospatial/dl02_training_summary.xlsx
deep_learning/DL_02_train_unet_deeplabv3_geospatial/dl02_model_performance_summary.csv
deep_learning/DL_02_train_unet_deeplabv3_geospatial/dl02_class_level_metrics.csv
deep_learning/DL_02_train_unet_deeplabv3_geospatial/confusion_matrix_UNet.png
deep_learning/DL_02_train_unet_deeplabv3_geospatial/confusion_matrix_DeepLabV3Plus.png
deep_learning/DL_02_train_unet_deeplabv3_geospatial/UNet_predicted_potential_class.tif
deep_learning/DL_02_train_unet_deeplabv3_geospatial/UNet_prediction_confidence.tif
```

## QGIS visualization workflow

Final maps should be prepared in QGIS using the outputs from the notebooks.

Recommended map outputs:

```text
01_rule_based_suitability_map_jawa_barat.png
02_ml_predicted_suitability_map_jawa_barat.png
03_ml_prediction_error_map_jawa_barat.png
04_unet_deep_learning_suitability_map_jawa_barat.png
05_unet_prediction_confidence_map_jawa_barat.png
```

Recommended QGIS project files:

```text
qgis/geospatial_biomass_jawa_barat_final_map.qgz
qgis/geospatial_biomass_jawa_barat_ml_map.qgz
qgis/geospatial_biomass_jawa_barat_deep_learning_map.qgz
```

Refer to:

```text
docs/qgis_mapping_workflow.md
```

## Reproducing the final manuscript tables

Run:

```bash
python scripts/create_reproducibility_tables.py
```

or use the existing generated table workbook:

```text
outputs/tables/integrated_ml_dl_performance_tables.xlsx
```

Expected tables:

```text
Table 1 — Dataset and Feature Summary
Table 2 — Machine Learning Baseline Performance
Table 3 — Deep Learning Segmentation Performance
Table 4 — Class-Level Deep Learning Metrics
Table 5 — Final Figure List
```

## Reproducibility notes

1. The suitability labels used for machine learning and deep learning are proxy labels derived from a rule-based suitability index.
2. The outputs should be interpreted as model-based spatial learning from proxy suitability labels, not as direct field-validated residue availability.
3. Large geospatial files and model weights should be archived externally and referenced in `DATA_ACCESS.md`.
4. Third-party datasets should be downloaded from their original providers when redistribution is restricted.
5. QGIS map layouts may require minor path adjustments if the project is moved to a different computer.

> All code, processing notebooks, configuration templates, and reproducibility documentation are provided in the accompanying GitHub repository. Large raster datasets, trained model weights, and patch datasets are archived separately and referenced in `DATA_ACCESS.md`. The suitability labels used for ML and DL experiments are proxy labels derived from a rule-based spatial suitability index; therefore, the model outputs should be interpreted as spatial suitability pattern learning rather than field-validated residue measurements.
