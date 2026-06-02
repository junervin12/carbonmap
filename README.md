# Multi-Source Geospatial AI Framework for Mapping Agro-Industrial Residue Potential for Biomass-Derived Carbon Nanomaterial Feedstock

## Data and Code Availability

This repository contains the reproducible workflow, notebooks, metadata templates, and documentation used to support the paper:

**A Multi-Source Geospatial Deep Learning Framework for Mapping Agro-Industrial Residue Potential for Biomass-Derived Carbon Nanomaterial Production**

The study maps agro-industrial residue potential in West Java, Indonesia by integrating Sentinel-2 imagery, VIIRS nighttime lights, ESA WorldCover, agricultural production statistics, administrative boundaries, OpenStreetMap road data, agro-industrial facility locations, rule-based suitability modeling, machine learning baselines, and deep learning segmentation models.

> **Important reproducibility note:** The repository is designed to support transparent replication. Some raw and intermediate geospatial files are large and should not be committed directly to GitHub. Large datasets should be deposited in a persistent data repository such as Zenodo, OSF, institutional repository storage, or GitHub Releases/Git LFS, then referenced here using stable URLs and checksums.

---

## 1. Repository Structure

```text
.
├── README.md
├── CITATION.cff
├── LICENSE
├── requirements.txt
├── environment.yml
├── config/
│   └── config_template.yaml
├── data/
│   ├── raw/
│   ├── interim/
│   ├── processed/
│   └── external/
├── docs/
│   ├── data_dictionary.md
│   ├── qgis_mapping_workflow.md
├── notebooks/
│   ├── 00_gee_export_remote_sensing_layers.ipynb
│   ├── 01_residue_estimation_and_facility_preprocessing.ipynb
│   ├── 02_create_1km_grid_west_java.ipynb
│   ├── 03_extract_raster_features_to_grid.ipynb
│   ├── 04_rule_based_suitability_and_distance_features.ipynb
│   ├── 05_ml_baseline_suitability_modeling.ipynb
│   ├── 06_dl01_prepare_raster_labels_and_patches.ipynb
│   └── 07_dl02_train_unet_deeplabv3_geospatial.ipynb
├── scripts/
│   ├── gee_export_remote_sensing_layers.js
│   ├── check_project_structure.py
│   └── create_reproducibility_tables.py
├── outputs/
│   ├── figures/
│   ├── tables/
│   ├── maps/
│   └── models/
└── qgis/
```

---

## 2. Computational Environment

The workflow was developed using Google Colab, QGIS, Google Earth Engine, and Python geospatial libraries. The recommended runtime is:

- Python 3.10 or later
- Google Colab GPU runtime for deep learning
- QGIS 3.34 or later for map visualization and print layout
- Google Earth Engine account for remote sensing export

Install the Python dependencies using:

```bash
pip install -r requirements.txt
```

or create a Conda environment using:

```bash
conda env create -f environment.yml
conda activate geospatial-biomass-ai
```

---

## 3. Required Input Data

The following input datasets are required to reproduce the workflow. Public datasets should be downloaded from their official sources whenever possible.

| Dataset | Role in workflow | Suggested location |
|---|---|---|
| Sentinel-2 annual composite and spectral indices | Spectral and vegetation predictors | `data/external/` |
| VIIRS Nighttime Lights | Human activity and infrastructure proxy | `data/external/` |
| ESA WorldCover | Land-cover and cropland context | `data/external/` |
| West Java administrative boundary | Spatial clipping and district attribution | `data/raw/` |
| Agricultural production statistics | Residue estimation | `data/raw/` |
| OpenStreetMap major roads | Road accessibility | `data/raw/` |
| Agro-industrial facility points | Agro-industrial proximity and density | `data/processed/` |
| Final 1 km grid suitability dataset | ML and DL labels | `data/processed/` |

Expected file names used by the notebooks:

```text
boundary_kabupaten_kota_jawa_barat_27_big.geojson
crop_production_panel_2017_2022.xlsx
osm_major_roads_jawa_barat.geojson
agroindustry_facilities_jawa_barat_final.geojson
sentinel2_indices_jawa_barat_2024_scale50.tif
viirs_nighttime_lights_jawa_barat_2024.tif
esa_worldcover_jawa_barat.tif
cropland_mask_jawa_barat.tif
grid_suitability_jawa_barat_final.xlsx
grid_suitability_jawa_barat_final.gpkg
grid_suitability_jawa_barat_ml_prediction.gpkg
```

---

## 4. Reproducible Workflow

Run the notebooks in the following order.

### Step 0. Export remote sensing layers from Google Earth Engine

```text
notebooks/00_gee_export_remote_sensing_layers.ipynb
scripts/gee_export_remote_sensing_layers.js
```

This step exports Sentinel-2 spectral bands and indices, VIIRS nighttime lights, ESA WorldCover, and a cropland mask for West Java.

### Step 1. Estimate agro-industrial residue and preprocess facility data

```text
notebooks/01_residue_estimation_and_facility_preprocessing.ipynb
```

This step estimates residue availability from commodity production statistics and prepares agro-industrial facility locations.

### Step 2. Create a 1 km × 1 km spatial grid

```text
notebooks/02_create_1km_grid_west_java.ipynb
```

This step creates a grid over West Java using UTM Zone 48S for area-consistent grid generation and exports GeoPackage/GeoJSON outputs.

### Step 3. Extract raster features to the grid

```text
notebooks/03_extract_raster_features_to_grid.ipynb
```

This step extracts Sentinel-2 indices, VIIRS nighttime lights, cropland ratio, and land-cover majority to each grid cell.

### Step 4. Compute distance features and rule-based suitability index

```text
notebooks/04_rule_based_suitability_and_distance_features.ipynb
```

This step computes distance to major roads, distance to agro-industrial facilities, agro-industrial density metrics, grid-level residue allocation, and the rule-based suitability score:

```text
suitability_score_final =
0.40 × residue_score
+ 0.20 × agroindustry_proximity_score
+ 0.15 × road_accessibility_score
+ 0.10 × nighttime_light_score
+ 0.10 × cropland_score
+ 0.05 × environmental_score
```

### Step 5. Train machine learning baselines

```text
notebooks/05_ml_baseline_suitability_modeling.ipynb
```

This step trains Random Forest, HistGradientBoosting, and XGBoost models for regression and classification using proxy suitability labels.

### Step 6. Prepare deep learning raster labels and patches

```text
notebooks/06_dl01_prepare_raster_labels_and_patches.ipynb
```

This step rasterizes the grid-level labels and prepares patch datasets for semantic segmentation.

### Step 7. Train deep learning segmentation models

```text
notebooks/07_dl02_train_unet_deeplabv3_geospatial.ipynb
```

This step trains U-Net and DeepLabV3+ models and exports prediction/confidence rasters.

---

## 5. Main Outputs

The workflow produces the following main outputs.

| Output | Description |
|---|---|
| `grid_suitability_jawa_barat_final.gpkg` | Rule-based grid suitability dataset |
| `grid_suitability_jawa_barat_final.xlsx` | Tabular version of the rule-based suitability dataset |
| `grid_suitability_jawa_barat_ml_prediction.gpkg` | ML prediction map and attributes |
| `UNet_predicted_potential_class.tif` | U-Net predicted suitability class raster |
| `UNet_prediction_confidence.tif` | U-Net pixel-level prediction confidence raster |
| `integrated_ml_dl_performance_tables.xlsx` | Final ML and DL performance tables |
| `confusion_matrix_UNet.png` | U-Net confusion matrix |
| `confusion_matrix_DeepLabV3Plus.png` | DeepLabV3+ confusion matrix |

---

## 6. Figure List for the Paper

Recommended final figures include:

1. Research workflow of the proposed multi-source geospatial AI framework.
2. Rule-based suitability map of West Java.
3. Machine learning-predicted suitability map.
4. Machine learning prediction error map.
5. U-Net deep learning-predicted suitability map.
6. Model performance comparison and confusion matrices.
7. U-Net prediction confidence map.
8. XGBoost feature importance plot.

---

## 7. Data Availability Statement Template

The geospatial processing code, machine learning notebooks, deep learning notebooks, and documentation required to reproduce the analysis are available in this repository. Large raster datasets and intermediate geospatial outputs are not stored directly in GitHub because of file size constraints. These files should be deposited in a persistent data repository and linked here using stable URLs. Publicly available source datasets include Sentinel-2, VIIRS Nighttime Lights, ESA WorldCover, OpenStreetMap, administrative boundary data, and agricultural production statistics. Derived datasets and model outputs can be regenerated using the notebooks provided in the repository.

---

## 8. Limitations and Reproducibility Notes

- The suitability labels used for ML and DL training are proxy labels derived from a rule-based spatial suitability index, not direct field measurements.
- Agro-industrial facility locations were compiled from public map sources and manually curated. Users should verify facility locations when applying the workflow to other regions.
- The deep learning models learn spatial patterns from proxy suitability labels. Their outputs should be interpreted as model-based suitability predictions rather than direct validation of actual residue availability.
- Field validation, facility-level residue capacity data, and updated agricultural statistics are recommended for future work.

---

## 9. Citation

If you use this repository, please cite the associated paper and this repository. A citation template is provided in `CITATION.cff`.

---

## 10. Contact

For questions about the workflow, please contact the corresponding author listed in the associated paper.
