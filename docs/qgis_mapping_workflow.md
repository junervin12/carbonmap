# QGIS Mapping Workflow

This document provides recommended visualization settings for reproducing the maps used in the paper.

## 1. Rule-Based Suitability Map

Layer: `grid_suitability_jawa_barat_final.gpkg`

- Symbology: Categorized
- Value: `potential_class_final`
- Colors:
  - Very Low: light gray
  - Low: light green
  - Moderate: yellow
  - High: orange
  - Very High: red
- Recommended supporting layers:
  - `boundary_kabupaten_kota_jawa_barat_27_big.geojson`
  - `osm_major_roads_jawa_barat.geojson`
  - `agroindustry_facilities_jawa_barat_final.geojson`

## 2. ML-Predicted Suitability Map

Layer: `grid_suitability_jawa_barat_ml_prediction.gpkg`

- Symbology: Categorized
- Value: `ml_predicted_potential_class`
- Use the same color scheme as the rule-based suitability map.

## 3. ML Prediction Error Map

Layer: `grid_suitability_jawa_barat_ml_prediction.gpkg`

- Symbology: Graduated
- Value: `ml_prediction_error_rule_based`
- Recommended color ramp: diverging blue-white-red
- Interpretation:
  - Negative values: ML prediction lower than rule-based score
  - Values near zero: strong agreement
  - Positive values: ML prediction higher than rule-based score

## 4. U-Net Prediction Map

Layer: `UNet_predicted_potential_class.tif`

- Render type: Paletted/Unique values
- Values:
  - 0: Very Low
  - 1: Low
  - 2: Moderate
  - 3: High
  - 4: Very High
  - 255: NoData / transparent

## 5. U-Net Confidence Map

Layer: `UNet_prediction_confidence.tif`

- Render type: Singleband pseudocolor
- Range: 0.25 to 1.00
- NoData: -9999
- Color ramp: Viridis or Yellow-Green-Blue
- Recommended labels:
  - 0.25–0.40 Very Low Confidence
  - 0.40–0.55 Low Confidence
  - 0.55–0.70 Moderate Confidence
  - 0.70–0.85 High Confidence
  - 0.85–1.00 Very High Confidence

## 6. Recommended Layout Text

### Rule-Based Suitability Map Title

Grid-Based Suitability Map for Biomass-Derived Carbon Nanomaterial Feedstock Potential in West Java, Indonesia

### ML Prediction Map Title

Machine Learning-Based Suitability Prediction for Biomass-Derived Carbon Nanomaterial Feedstock Potential

### U-Net Prediction Map Title

U-Net Deep Learning-Based Suitability Prediction for Biomass-Derived Carbon Nanomaterial Feedstock Potential

### Confidence Map Title

U-Net Prediction Confidence Map for Biomass-Derived Carbon Nanomaterial Feedstock Suitability

### Data Source Note

Data sources: Sentinel-2, VIIRS Nighttime Lights, ESA WorldCover, OpenStreetMap, BIG administrative boundaries, and West Java agricultural statistics. Spatial processing, residue estimation, proxy labeling, and modeling were conducted by the authors.
