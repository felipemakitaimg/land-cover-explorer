import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { Sentinel2RasterFunction } from '../../components/ControlPanel/Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';
import { LandCoverClassification } from '../../services/sentinel-2-10m-landcover/rasterAttributeTable';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type MapExtent = {
    spatialReference?: {
        latestWkid?: number;
        wkid?: number;
    };
    xmin?: number;
    xmax?: number;
    ymin?: number;
    ymax?: number;
};

export type MapCenter = {
    lon?: number;
    lat?: number;
};

export type MapState = {
    /**
     * If true, show Sentinel 2 Layer instead of Land Cover Layer
     */
    shouldShowSentinel2Layer?: boolean;
    /**
     * The month that will be used to fetch sentinel-2 imagery layer
     */
    sentinel2AquisitionMonth?: number;
    /**
     * Represents the level of detail (LOD) at the center of the view.
     */
    zoom?: number;
    /**
     * Represents the view's center point
     */
    center?: MapCenter;
    /**
     * Represents the size of one pixel in map units.
     * The value of resolution can be found by dividing the extent width by the view's width.
     */
    resolution?: number;
    /**
     * The extent represents the visible portion of a map within the view as an instance of Extent.
     */
    extent?: MapExtent;
    swipeWidget?: {
        year4LeadingLayer?: number;
        year4TrailingLayer?: number;
        position?: number;
    };
    /**
     * The active Land Cover type selected by the user that will be used to
     * get the raster functions to filter the Land Cover layer
     */
    selectedLandCover?: LandCoverClassification;
    /**
     * If true, Map Reference Labels layer will be on
     */
    showMapLabel?: boolean;
    /**
     * If true, Terrain Layer will be on
     */
    showTerrain?: boolean;
    /**
     * Sentinel 2 Raster function that will be used to render the layer
     */
    selectedSentinel2RasterFunction?: Sentinel2RasterFunction;
};

export const initialMapState: MapState = {
    shouldShowSentinel2Layer: false,
    sentinel2AquisitionMonth: 9,
    zoom: 11,
    center: null,
    resolution: null,
    extent: null,
    swipeWidget: null,
    selectedLandCover: null,
    showMapLabel: true,
    showTerrain: true,
    selectedSentinel2RasterFunction: 'Natural Color with DRA',
};

const slice = createSlice({
    name: 'Map',
    initialState: initialMapState,
    reducers: {
        year4LeadingLayerUpdated: (state, action: PayloadAction<number>) => {
            state.swipeWidget.year4LeadingLayer = action.payload;
        },
        year4TrailingLayerUpdated: (state, action: PayloadAction<number>) => {
            state.swipeWidget.year4TrailingLayer = action.payload;
        },
        resolutionUpdated: (state, action: PayloadAction<number>) => {
            state.resolution = action.payload;
        },
        extentUpdated: (state, action: PayloadAction<MapExtent>) => {
            state.extent = action.payload;
        },
        shouldShowSentinel2LayerToggled: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.shouldShowSentinel2Layer = action.payload;
        },
        selectedLandCoverChanged: (
            state,
            action: PayloadAction<LandCoverClassification>
        ) => {
            state.selectedLandCover = action.payload;
        },
        swipePositionChanged: (state, action: PayloadAction<number>) => {
            state.swipeWidget.position = action.payload;
        },
        showMapLabelToggled: (state) => {
            state.showMapLabel = !state.showMapLabel;
        },
        showTerrainToggled: (state) => {
            state.showTerrain = !state.showTerrain;
        },
        mapCenterUpdated: (state, action: PayloadAction<MapCenter>) => {
            state.center = action.payload;
        },
        zoomUpdated: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload;
        },
        selectedSentinel2RasterFunctionChanged: (
            state,
            action: PayloadAction<Sentinel2RasterFunction>
        ) => {
            state.selectedSentinel2RasterFunction = action.payload;
        },
        sentinel2AquisitionMonthChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.sentinel2AquisitionMonth = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    year4LeadingLayerUpdated,
    year4TrailingLayerUpdated,
    resolutionUpdated,
    extentUpdated,
    shouldShowSentinel2LayerToggled,
    selectedLandCoverChanged,
    swipePositionChanged,
    showMapLabelToggled,
    showTerrainToggled,
    mapCenterUpdated,
    zoomUpdated,
    selectedSentinel2RasterFunctionChanged,
    sentinel2AquisitionMonthChanged,
} = slice.actions;

export default reducer;
