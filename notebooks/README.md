# Notebooks

This folder contains the repository-ready Jupyter notebooks used in the reproducible workflow for the West Java biomass-derived carbon nanomaterial feedstock suitability study.

Recommended execution order:

1. `00_gee_export_remote_sensing_layers.ipynb`
2. `01_residue_estimation_and_facility_preprocessing.ipynb`
3. `02_create_1km_grid_west_java.ipynb`
4. `03_extract_raster_features_to_grid.ipynb`
5. `04_rule_based_suitability_and_distance_features.ipynb`
6. `05_ml_baseline_suitability_modeling.ipynb`
7. `06_dl01_prepare_raster_labels_and_patches.ipynb`
8. `07_dl02_train_unet_deeplabv3_geospatial.ipynb`

The notebooks are written in academic English and have been cleared of execution outputs and project-specific chat instructions. Adjust file paths in the configuration cells before running them in Google Colab or a local Python environment.
