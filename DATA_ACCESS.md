# Data Access and Data Management

This document describes the datasets used in this repository, how they should be obtained, which files are redistributed in the GitHub repository, and which files should be archived externally because of file-size or licensing constraints.

## Study context

This repository supports the study:

**A Multi-Source Geospatial Deep Learning Framework for Mapping Agro-Industrial Residue Potential for Biomass-Derived Carbon Nanomaterial Production**

The study integrates Sentinel-2 imagery, VIIRS nighttime lights, ESA WorldCover land-cover data, agricultural production statistics, administrative boundaries, road networks, agro-industrial facility locations, rule-based suitability modeling, machine learning baselines, and deep learning-based semantic segmentation.

## Recommended data storage strategy

For reproducibility and compliance with international journal standards, this repository separates the materials into two storage levels:

1. **GitHub repository**: source code, notebooks, documentation, small tabular files, small vector files, QGIS styles, selected figures, and summary tables.
2. **External archival repository**: large rasters, GeoPackages, NumPy patch datasets, and trained model weights. Recommended services include Zenodo, OSF, Figshare, institutional repositories, or GitHub Releases/Git LFS.

> Important: Raw third-party datasets should not be redistributed if their original license does not permit redistribution. In such cases, this repository provides download instructions and preprocessing scripts instead.

## Directory-level data policy

| Directory | Purpose | Recommended content | GitHub status |
|---|---|---|---|
| `data/raw/` | Original or minimally processed input data | small agricultural statistics tables, small administrative boundary files, cleaned facility locations if redistribution is permitted | include small files only |
| `data/interim/` | Intermediate processing outputs | residue estimation tables, cleaned facility candidates, grid summaries | include small files only |
| `data/processed/` | Final model-ready datasets | final suitability tables, final ML prediction tables, performance CSV files | include small files only |
| `data/external/` | Third-party data references | download instructions, metadata, links to GEE/OSM/GADM/BIG/ESA/VIIRS sources | prefer documentation over redistribution |
| `outputs/maps/` | Final exported maps | PNG/PDF maps exported from QGIS | include selected final maps |
| `outputs/figures/` | Manuscript figures | workflow diagrams, confusion matrices, feature importance plots | include selected final figures |
| `outputs/tables/` | Manuscript tables | integrated ML/DL performance tables and dataset summaries | include |
| `outputs/models/` | Model checkpoints and model metadata | README and external links to `.pth` files | do not include large model files directly |
| `qgis/` | QGIS project and style files | `.qgz`, `.qml`, layout exports | include if paths are portable and no sensitive local paths exist |

## Data sources and access instructions

### Sentinel-2 surface reflectance and spectral indices

**Role in the study**: spectral and vegetation predictors, including Sentinel-2 bands and derived indices such as NDVI, EVI, NDWI, NBR, and SAVI.

**Source**: Google Earth Engine Sentinel-2 Harmonized Surface Reflectance.

**Expected derived file**:

```text
sentinel2_indices_jawa_barat_2024_scale50.tif
```

**GitHub policy**: do not commit the GeoTIFF if large. Archive externally and provide a DOI or public link.

**Reproduction**: run:

```text
notebooks/00_gee_export_remote_sensing_layers.ipynb
scripts/gee_export_remote_sensing_layers.js
```

### VIIRS nighttime lights

**Role in the study**: proxy for human activity, infrastructure concentration, urbanization, and agro-industrial development.

**Source**: VIIRS nighttime lights annual composite, preferably accessed through Google Earth Engine.

**Expected derived file**:

```text
viirs_nighttime_lights_jawa_barat_2024.tif
```

**GitHub policy**: do not commit the GeoTIFF if large. Archive externally and provide a DOI or public link.

### ESA WorldCover land cover

**Role in the study**: land-cover classification, cropland identification, environmental suitability constraints, and spatial interpretation.

**Expected derived files**:

```text
esa_worldcover_jawa_barat.tif
cropland_mask_jawa_barat.tif
```

**GitHub policy**: do not commit large raster files directly unless using Git LFS or external release storage.

### Agricultural production statistics

**Role in the study**: crop production and residue estimation.

**Recommended GitHub files**:

```text
data/raw/crop_production_panel_2017_2022.xlsx
data/interim/crop_production_summary_2018_2022.xlsx
data/interim/crop_production_summary_2018_2022_with_residue_parameters.xlsx
data/interim/crop_production_summary_2018_2022_with_residue_estimation.xlsx
data/interim/crop_production_summary_2018_2022_with_residue_map_join_big27.xlsx
```

**Redistribution note**: include only if the dataset is public and redistribution is permitted. Otherwise, include a source link and the preprocessing notebooks.

### Administrative boundaries

**Role in the study**: defining the West Java study area, district/city-level spatial joins, raster clipping, and map layout.

**Recommended GitHub files**:

```text
data/raw/boundary_kabupaten_kota_jawa_barat_27_big.geojson
```

**External alternatives**: BIG administrative boundary data, GADM Indonesia administrative boundary data for inset maps.

**Redistribution note**: verify the original license before redistributing boundary data.

### OpenStreetMap road network

**Role in the study**: road accessibility and distance-to-major-road calculation.

**Recommended file**:

```text
data/raw/osm_major_roads_jawa_barat.geojson
```

**Source**: OpenStreetMap / Geofabrik extract.

**Recommended attribution**: include OpenStreetMap attribution in the map/data source note when using OSM-derived road data.

### Agro-industrial facility locations

**Role in the study**: distance to agro-industrial facilities, facility density within 5 km and 10 km, and interpretation of processing proximity.

**Recommended GitHub files**:

```text
data/processed/agroindustry_facilities_jawa_barat_final.xlsx
data/processed/agroindustry_facilities_jawa_barat_final.geojson
```

**Privacy and redistribution note**: if the facility table was derived from web search or public map APIs, remove non-essential or sensitive fields before public release. Recommended public columns:

```text
facility_name
facility_type
commodity
district_final
latitude
longitude
source
validation_status
```

Recommended columns to remove from the public GitHub repository unless explicitly needed and license-compliant:

```text
phone
place_id
data_id
reviews
rating
raw_address
```

### Grid, suitability, and ML/DL outputs

Small tables can be stored in GitHub, while large geospatial products should be archived externally.

**Recommended GitHub files**:

```text
data/processed/grid_suitability_jawa_barat_final.xlsx
data/processed/grid_suitability_jawa_barat_ml_prediction.xlsx
data/processed/dl02_model_performance_summary.csv
data/processed/dl02_class_level_metrics.csv
outputs/tables/integrated_ml_dl_performance_tables.xlsx
```

**Recommended external archive files**:

```text
grid_1km_jawa_barat.gpkg
grid_suitability_jawa_barat_final.gpkg
grid_suitability_jawa_barat_ml_prediction.gpkg
patch_dataset_classification_regression.npz
UNet_best.pth
DeepLabV3Plus_best.pth
UNet_predicted_potential_class.tif
UNet_prediction_confidence.tif
```

## External archive placeholders

Update the following table after uploading large files to Zenodo, OSF, Figshare, Google Drive public folder, or GitHub Releases.

| File group | External repository/link | DOI, if available | Notes |
|---|---|---|---|
| Remote sensing GeoTIFF files | `TO_BE_ADDED` | `TO_BE_ADDED` | Sentinel-2, VIIRS, ESA WorldCover, cropland mask |
| Final geospatial datasets | `TO_BE_ADDED` | `TO_BE_ADDED` | GeoPackage and GeoJSON outputs |
| Deep learning patch dataset | `TO_BE_ADDED` | `TO_BE_ADDED` | `.npz` patch dataset from DL-01 |
| Trained model weights | `TO_BE_ADDED` | `TO_BE_ADDED` | `UNet_best.pth`, `DeepLabV3Plus_best.pth` |
| Prediction rasters | `TO_BE_ADDED` | `TO_BE_ADDED` | U-Net class prediction and confidence rasters |

## Checksums

For large externally archived files, provide SHA256 checksums to ensure reproducibility.

Example command:

```bash
sha256sum UNet_best.pth
sha256sum patch_dataset_classification_regression.npz
sha256sum UNet_predicted_potential_class.tif
```

Recommended table format:

| File name | SHA256 checksum |
|---|---|
| `UNet_best.pth` | `TO_BE_ADDED` |
| `DeepLabV3Plus_best.pth` | `TO_BE_ADDED` |
| `patch_dataset_classification_regression.npz` | `TO_BE_ADDED` |
| `UNet_predicted_potential_class.tif` | `TO_BE_ADDED` |
| `UNet_prediction_confidence.tif` | `TO_BE_ADDED` |

## Sensitive files that must not be committed

Do not upload:

```text
.env
credentials.json
Google service account keys
SerpApi API keys
private Google Drive tokens
raw API response caches containing unnecessary personal or contact fields
QGIS cache files
Colab temporary files
.ipynb_checkpoints/
```

## Recommended data availability statement

The following statement can be adapted for the manuscript:

> The code, processing notebooks, configuration files, and reproducibility documentation are available in the accompanying GitHub repository. Large geospatial datasets, trained model weights, raster predictions, and patch datasets are archived separately in an external repository and referenced in `DATA_ACCESS.md`. Raw third-party datasets are not redistributed when restricted by their original licenses; download instructions and preprocessing scripts are provided to support reproducibility.
