import React from 'react';
import Sentinel2LayerRasterFunctionsList from './Sentinel2LayerRasterFunctionsList';

import ThumbnailNatrualColor from './thumbnails/Imagery_NaturalColor.png';
import ThumbnailAgriculture from './thumbnails/Imagery_Agriculture.png';
import ThumbnailColorIR from './thumbnails/Imagery_ColorIR.png';
import ThumbnailNDMI from './thumbnails/Imagery_NDMI.png';
import ThumbnailNDVI from './thumbnails/Imagery_NDVI.png';
import ThumbnailSWIR from './thumbnails/Imagery_SWIR.png';
import { useDispatch } from 'react-redux';
import { selectedSentinel2RasterFunctionChanged } from '../../../store/Map/reducer';
import { useSelector } from 'react-redux';
import { selectSentinel2RasterFunction } from '../../../store/Map/selectors';

export type Sentinel2RasterFunction =
    | 'Natural Color with DRA'
    | 'Agriculture with DRA'
    | 'Color Infrared with DRA'
    | 'Short-wave Infrared with DRA'
    | 'NDVI Colormap'
    | 'NDMI Colorized';

export type RasterFunctionData = {
    name: Sentinel2RasterFunction;
    label: string;
    description: string;
    thumbnail: string;
};

const Data: RasterFunctionData[] = [
    {
        name: 'Natural Color with DRA',
        label: 'Natural Color',
        description:
            'Natural Color bands red, green, blue (4, 3, 2) displayed with dynamic range adjustment applied.',
        thumbnail: ThumbnailNatrualColor,
    },
    {
        name: 'Short-wave Infrared with DRA',
        label: 'SWIR',
        description:
            'Bands shortwave infrared-2, shortwave infrared-1, red (12, 11, 4) with dynamic range adjustment applied.',
        thumbnail: ThumbnailSWIR,
    },
    {
        name: 'Agriculture with DRA',
        label: 'Agriculture',
        description:
            'Bands shortwave IR-1, near-IR, blue (11, 8, 2) with dynamic range adjustment applied. Vigorous veg. is bright green, stressed veg. dull green and bare areas as brown.',
        thumbnail: ThumbnailAgriculture,
    },
    {
        name: 'NDVI Colormap',
        label: 'NDVI',
        description:
            'Normalized difference vegetation index (NDVI) with colormap. Dark green represents vigorous vegetation and brown represents sparse vegetation. It is computed as (b8 - b4) / (b8 + b4) and is suitable for vegetation, land cover and plant health monitoring.',
        thumbnail: ThumbnailNDVI,
    },
    {
        name: 'Color Infrared with DRA',
        label: 'Color IR',
        description:
            'Bands near-infrared, red, green (8,4,3) with dynamic range adjustment applied. Healthy vegetation is bright red while stressed vegetation is dull red',
        thumbnail: ThumbnailColorIR,
    },
    {
        name: 'NDMI Colorized',
        label: 'NDMI',
        description:
            'Normalized Difference Moisture Index with color map. Wetlands and moist areas appear blue whereas dry areas are represented by deep yellow and brown color. It is computed as NIR(B8)-SWIR1(B11)/NIR(B8)+SWIR1(B11).',
        thumbnail: ThumbnailNDMI,
    },
];

const ImageryRasterFunctionsListContainer = () => {
    const dispatch = useDispatch();

    const selectedRasterFunction = useSelector(selectSentinel2RasterFunction);

    return (
        <Sentinel2LayerRasterFunctionsList
            selectedRasterFunction={selectedRasterFunction}
            data={Data}
            onSelect={(rasterFunction) => {
                const newRasterFunction =
                    rasterFunction !== selectedRasterFunction
                        ? rasterFunction
                        : null;
                dispatch(
                    selectedSentinel2RasterFunctionChanged(newRasterFunction)
                );
            }}
        />
    );
};

export default ImageryRasterFunctionsListContainer;
