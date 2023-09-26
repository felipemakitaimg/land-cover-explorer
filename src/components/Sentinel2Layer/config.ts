/**
 * Sentinel-2 Image Layer with embedded credentials uisng jzhang_content AGOL account
 *
 * https://sentinel.imagery1.arcgis.com/arcgis/rest/services/Sentinel2L2A/ImageServer
 */
export const SENTINEL_2_IMAGE_SERVICE_URL =
    // 'https://sentinel.imagery1.arcgis.com/arcgis/rest/services/Sentinel2L2A/ImageServer';
    'https://geo2utilitiesap.img.com.br/server/rest/services/Caesb/ImagensDronesCaesb/ImageServer';
// 'https://utility.arcgis.com/usrsvcs/servers/3f0ca149c08f4746bc0d0fef2cee1624/rest/services/Sentinel2L2A/ImageServer';

export const SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES = {
    // AcquisitionDate: 'acquisitiondate',
    AcquisitionDate: 'Data',
};
