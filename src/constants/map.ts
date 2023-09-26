/**
 * Main Web Map with base map layers owned by John Nelson
 *
 * https://nation.maps.arcgis.com/home/item.html?id=6ad8fa259c7d4195893bf412d5f1afa7
 */

import { TIER } from '.';

export const WEB_MAP_ID_PROD = 'f8770e0adc5c41038026494b871ceb99'; // 'f8770e0adc5c41038026494b871ceb99';

export const WEB_MAP_ID_DEV = '6ad8fa259c7d4195893bf412d5f1afa7'; // '6ad8fa259c7d4195893bf412d5f1afa7';

// export const WEB_MAP_ID =
//     TIER === 'development' ? WEB_MAP_ID_DEV : WEB_MAP_ID_PROD;

/**
 * Item Id of web map with Grayscale imagery basemap created by John Nelson
 *
 * @see https://www.arcgis.com/home/item.html?id=f8770e0adc5c41038026494b871ceb99
 */
export const WEB_MAP_ID = WEB_MAP_ID_PROD;

/**
 * Web Map (also owned by John Nelson) that will be used in the Download Panel
 */
export const DWONLOAD_MODE_WEB_MAP_ID = '20e55f26c4704ade8b9716117315f99b';

/**
 * ArcGIS Online Item of the Sentinel 2 layer
 */
export const SENTINEL_2_ITEM_URL =
    'https://geo2utilitiesap.img.com.br/portal/home/item.html?id=385ced2a2b5a498388578e414038903e';
// 'https://www.arcgis.com/home/item.html?id=255af1ceee844d6da8ef8440c8f90d00';

export const SENTINEL_2_10M_LAND_COVER_ITEM_ID = `cfcb7609de5f478eb7666240902d4d3d`;
/**
 * ArcGIS Online Item of the Sentinel 2 10m Land Cover layer
 */
export const SENTINEL_2_10M_LAND_COVER_ITEM_URL =
    'https://www.arcgis.com/home/item.html?id=' +
    SENTINEL_2_10M_LAND_COVER_ITEM_ID;

export const HUMAN_GEO_DARK_LABEL_LAYER_TITLE = 'Human Geography Dark Label';
export const HUMAN_GEO_LIGHT_WATER_LAYER_TITLE =
    'Human Geography Dark Detail Light Water';
export const HUMAN_GEO_DARK_DRY_LAYER_TITLE = 'Human Geography Dark Detail Dry';

export const TERRAIN_LAYER_TITLE = 'World Hillshade';

export const DEFAULT_MAP_CENTERS = [
    /** Paraná */
    [-48.276, -15.691],
];

export const DEFAULT_MAP_ZOOM = 11;

export const MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM = 10;

/**
 * Sentinel 2 layer can only be displayed on the map when the map zoom level is greater or equal to 11
 */
export const MIN_MAP_ZOOM_FOR_SENTINEL_2_LAYER = 11;
