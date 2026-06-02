# Data Dictionary

This document describes the main variables used in the grid-based suitability dataset, machine learning dataset, and deep learning outputs.

## Administrative and Geometry Fields

| Field | Description |
|---|---|
| `grid_id` | Unique identifier for each 1 km × 1 km grid cell. |
| `district` | District/city name assigned using spatial join with administrative boundary. |
| `district_code` | Administrative code if available from the boundary dataset. |
| `area_km2` | Grid cell area in square kilometers. |
| `coverage_ratio` | Proportion of a grid cell overlapping the study area. |
| `centroid_lon` | Longitude of grid centroid. |
| `centroid_lat` | Latitude of grid centroid. |

## Remote Sensing Features

| Field | Description |
|---|---|
| `mean_B2` | Mean Sentinel-2 blue band value within the grid cell. |
| `mean_B3` | Mean Sentinel-2 green band value within the grid cell. |
| `mean_B4` | Mean Sentinel-2 red band value within the grid cell. |
| `mean_B8` | Mean Sentinel-2 NIR band value within the grid cell. |
| `mean_B11` | Mean Sentinel-2 SWIR1 band value within the grid cell. |
| `mean_B12` | Mean Sentinel-2 SWIR2 band value within the grid cell. |
| `mean_NDVI` | Mean Normalized Difference Vegetation Index. |
| `mean_EVI` | Mean Enhanced Vegetation Index. |
| `mean_NDWI` | Mean Normalized Difference Water Index. |
| `mean_NBR` | Mean Normalized Burn Ratio. |
| `mean_SAVI` | Mean Soil-Adjusted Vegetation Index. |
| `mean_VIIRS_NTL` | Mean VIIRS nighttime light radiance. |
| `cropland_ratio` | Proportion of grid cell classified as cropland. |
| `landcover_majority` | Majority ESA WorldCover class value. |
| `landcover_name` | Human-readable ESA WorldCover class name. |

## Accessibility and Agro-Industrial Features

| Field | Description |
|---|---|
| `distance_to_road_km` | Distance from grid centroid to the nearest major road. |
| `road_accessibility_score` | Normalized score derived from distance to major roads. |
| `distance_to_agroindustry_km` | Distance from grid centroid to the nearest agro-industrial facility. |
| `agroindustry_proximity_score` | Normalized proximity score derived from distance to agro-industrial facilities. |
| `agroindustry_count_5km` | Number of agro-industrial facilities within 5 km. |
| `agroindustry_count_10km` | Number of agro-industrial facilities within 10 km. |
| `nearest_agroindustry_type` | Facility type of the nearest agro-industrial point. |
| `nearest_agroindustry_commodity` | Commodity associated with the nearest agro-industrial facility. |

## Residue and Suitability Fields

| Field | Description |
|---|---|
| `total_residue_ton_year` | Estimated total residue availability at the district level. |
| `estimated_grid_residue_ton_year` | Spatially disaggregated residue estimate for each grid cell. |
| `residue_score` | Normalized grid-level residue availability score. |
| `ntl_score` | Normalized nighttime lights score. |
| `cropland_score` | Cropland suitability score. |
| `environmental_score` | Environmental suitability indicator. |
| `suitability_score_final` | Rule-based suitability score integrating residue, accessibility, activity, cropland, and environment. |
| `potential_class_final` | Rule-based suitability class: Very Low, Low, Moderate, High, Very High. |

## Machine Learning Fields

| Field | Description |
|---|---|
| `ml_predicted_score` | ML-predicted suitability score, if available. |
| `ml_predicted_potential_class` | ML-predicted suitability class. |
| `ml_prediction_error_rule_based` | Difference between ML-predicted score and rule-based suitability score. |

## Deep Learning Outputs

| Output | Description |
|---|---|
| `UNet_predicted_potential_class.tif` | Raster of U-Net predicted suitability classes. |
| `UNet_prediction_confidence.tif` | Raster of U-Net maximum softmax probability per pixel. |
| `DeepLabV3Plus_predicted_potential_class.tif` | Raster of DeepLabV3+ predicted suitability classes, if exported. |
| `DeepLabV3Plus_prediction_confidence.tif` | Raster of DeepLabV3+ maximum softmax probability, if exported. |
