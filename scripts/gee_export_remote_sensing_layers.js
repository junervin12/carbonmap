// Google Earth Engine script for exporting remote sensing layers used in the study.
// Replace the boundary asset or import a West Java boundary geometry before running.
// Outputs: Sentinel-2 bands/indices, VIIRS nighttime lights, ESA WorldCover, cropland mask.

// -----------------------------------------------------------------------------
// 1. Study area
// -----------------------------------------------------------------------------
// Option A: Use an imported geometry named `westJava` in the GEE Code Editor.
// var region = westJava.geometry();

// Option B: Replace this placeholder with your own FeatureCollection asset.
// var westJava = ee.FeatureCollection('users/<username>/boundary_jawa_barat');
// var region = westJava.geometry();

// Placeholder: draw/import geometry and rename it to `region`.
var region = /* color: #d63000 */ ee.Geometry.Polygon(
        [[[105.0, -5.5], [109.5, -5.5], [109.5, -8.2], [105.0, -8.2]]], null, false);

Map.centerObject(region, 8);

// -----------------------------------------------------------------------------
// 2. Sentinel-2 preprocessing
// -----------------------------------------------------------------------------
function maskS2Clouds(image) {
  var scl = image.select('SCL');
  var mask = scl.neq(3)  // cloud shadow
    .and(scl.neq(8))     // medium probability cloud
    .and(scl.neq(9))     // high probability cloud
    .and(scl.neq(10))    // thin cirrus
    .and(scl.neq(11));   // snow/ice
  return image.updateMask(mask).divide(10000).copyProperties(image, ['system:time_start']);
}

var startDate = '2024-01-01';
var endDate = '2024-12-31';

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterDate(startDate, endDate)
  .filterBounds(region)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 40))
  .map(maskS2Clouds);

var composite = s2.median().clip(region);

var B2 = composite.select('B2').rename('B2');
var B3 = composite.select('B3').rename('B3');
var B4 = composite.select('B4').rename('B4');
var B8 = composite.select('B8').rename('B8');
var B11 = composite.select('B11').rename('B11');
var B12 = composite.select('B12').rename('B12');

var ndvi = B8.subtract(B4).divide(B8.add(B4)).rename('NDVI');
var evi = B8.subtract(B4).multiply(2.5)
  .divide(B8.add(B4.multiply(6)).subtract(B2.multiply(7.5)).add(1))
  .rename('EVI');
var ndwi = B3.subtract(B8).divide(B3.add(B8)).rename('NDWI');
var nbr = B8.subtract(B12).divide(B8.add(B12)).rename('NBR');
var savi = B8.subtract(B4).multiply(1.5).divide(B8.add(B4).add(0.5)).rename('SAVI');

var sentinelStack = ee.Image.cat([B2, B3, B4, B8, B11, B12, ndvi, evi, ndwi, nbr, savi]).clip(region);

Export.image.toDrive({
  image: sentinelStack,
  description: 'sentinel2_indices_jawa_barat_2024_scale50',
  folder: 'geospatial_biomass_carbon',
  fileNamePrefix: 'sentinel2_indices_jawa_barat_2024_scale50',
  region: region,
  scale: 50,
  crs: 'EPSG:4326',
  maxPixels: 1e13
});

// -----------------------------------------------------------------------------
// 3. VIIRS nighttime lights
// -----------------------------------------------------------------------------
var viirs = ee.ImageCollection('NOAA/VIIRS/DNB/ANNUAL_V22')
  .filterDate('2024-01-01', '2024-12-31')
  .select('average')
  .median()
  .rename('VIIRS_NTL')
  .clip(region);

Export.image.toDrive({
  image: viirs,
  description: 'viirs_nighttime_lights_jawa_barat_2024',
  folder: 'geospatial_biomass_carbon',
  fileNamePrefix: 'viirs_nighttime_lights_jawa_barat_2024',
  region: region,
  scale: 500,
  crs: 'EPSG:4326',
  maxPixels: 1e13
});

// -----------------------------------------------------------------------------
// 4. ESA WorldCover and cropland mask
// -----------------------------------------------------------------------------
var worldcover = ee.ImageCollection('ESA/WorldCover/v200')
  .first()
  .select('Map')
  .clip(region);

Export.image.toDrive({
  image: worldcover,
  description: 'esa_worldcover_jawa_barat',
  folder: 'geospatial_biomass_carbon',
  fileNamePrefix: 'esa_worldcover_jawa_barat',
  region: region,
  scale: 10,
  crs: 'EPSG:4326',
  maxPixels: 1e13
});

var croplandMask = worldcover.eq(40).rename('cropland_mask');

Export.image.toDrive({
  image: croplandMask,
  description: 'cropland_mask_jawa_barat',
  folder: 'geospatial_biomass_carbon',
  fileNamePrefix: 'cropland_mask_jawa_barat',
  region: region,
  scale: 10,
  crs: 'EPSG:4326',
  maxPixels: 1e13
});
