import React, { useEffect } from 'react';
// import Sentinel2LayerRasterFunctionsList from './Sentinel2LayerRasterFunctionsList';

import { useDispatch } from 'react-redux';
import { sentinel2RasterFunctionChanged } from '../../../store/Map/reducer';
import { useSelector } from 'react-redux';
import { selectSentinel2RasterFunction } from '../../../store/Map/selectors';
import { updateTooltipData } from '../../../store/UI/thunks';
import { saveSentinel2RasterFunctionToHashParams } from '../../../utils/URLHashParams';
import { selectAnimationMode } from '../../../store/UI/selectors';

export type Sentinel2RasterFunction = 'None';

export type RasterFunctionData = {
    name: Sentinel2RasterFunction;
    label: string;
    description: string;
    thumbnail: string;
};

export const Sentinel2RasterFunctionsData: RasterFunctionData[] = [];

// const ImageryRasterFunctionsListContainer = () => {
//     const dispatch = useDispatch();

//     const animationMode = useSelector(selectAnimationMode);

//     const selectedRasterFunction = useSelector(selectSentinel2RasterFunction);

//     useEffect(() => {
//         saveSentinel2RasterFunctionToHashParams(selectedRasterFunction);
//     }, [selectedRasterFunction]);

//     return (
//         <Sentinel2LayerRasterFunctionsList
//             selectedRasterFunction={selectedRasterFunction}
//             data={Sentinel2RasterFunctionsData}
//             disabled={animationMode !== null}
//             onSelect={(rasterFunction) => {
//                 dispatch(sentinel2RasterFunctionChanged(rasterFunction));
//             }}
//             itemOnHover={(data) => {
//                 dispatch(updateTooltipData(data));
//             }}
//         />
//     );
// };

// export default ImageryRasterFunctionsListContainer;
