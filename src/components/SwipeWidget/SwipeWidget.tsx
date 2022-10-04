import './style.css';
import React, { FC, useEffect, useMemo, useRef } from 'react';

import ISwipe from 'esri/widgets/Swipe';
import IMapView from 'esri/views/MapView';
import { loadModules } from 'esri-loader';
import useLandCoverLayer from '../LandcoverLayer/useLandCoverLayer';
import IImageryLayer from 'esri/layers/ImageryLayer';
import useSentinel2Layer from '../Sentinel2Layer/useSentinel2Layer';
import { LandCoverClassification } from '../../services/sentinel-2-10m-landcover/rasterAttributeTable';
import IReactiveUtils from 'esri/core/reactiveUtils';

type Props = {
    /**
     * If true, display sentinel 2 imagery layer
     */
    shouldShowSentinel2Layer: boolean;
    /**
     * The year that will be used to get the leading layer
     */
    yearForLeadingLayer: number;
    /**
     * The year that will be used to get the trailing layer
     */
    yearForTailingLayer: number;
    /**
     *
     */
    selectedLandCover: LandCoverClassification;
    /**
     * Indicate if Swipe Widget is visible
     */
    visible: boolean;
    /**
     * Map view that contains Swipe Widget
     */
    mapView?: IMapView;
    /**
     * Fires when user drag and change swipe position
     */
    positionOnChange: (position: number) => void;
    /**
     * Fires when user hover in/out handler element, which toggle dispalys the reference info
     */
    referenceInfoOnToggle: (shouldDisplay: boolean) => void;
};

/**
 * Swipe Widget to compare land cover layers from two different years
 */
const SwipeWidget: FC<Props> = ({
    shouldShowSentinel2Layer,
    yearForLeadingLayer,
    yearForTailingLayer,
    selectedLandCover,
    mapView,
    visible,
    positionOnChange,
    referenceInfoOnToggle,
}: Props) => {
    const swipeWidgetRef = useRef<ISwipe>();

    const leadingLandCoverLayer = useLandCoverLayer({
        year: yearForLeadingLayer,
        selectedLandCover,
    });

    const leadingSentinel2Layer = useSentinel2Layer({
        year: yearForLeadingLayer,
    });

    const trailingLandcoverLayer = useLandCoverLayer({
        year: yearForTailingLayer,
        selectedLandCover,
    });

    const trailingSentinel2Layer = useSentinel2Layer({
        year: yearForTailingLayer,
    });

    const init = async () => {
        type Modules = [typeof ISwipe, typeof IReactiveUtils];

        const [Swipe, reactiveUtils] = await (loadModules([
            'esri/widgets/Swipe',
            'esri/core/reactiveUtils',
        ]) as Promise<Modules>);

        // mapView.map.addMany([leadingLayer, trailingLayer]);

        swipeWidgetRef.current = new Swipe({
            view: mapView,
            leadingLayers: [],
            trailingLayers: [],
            direction: 'horizontal',
            position: 50, // position set to middle of the view (50%)
            visible,
        });

        // console.log(swipeWidgetRef.current)
        mapView.ui.add(swipeWidgetRef.current);

        reactiveUtils.watch(
            () => swipeWidgetRef.current.position,
            (position: number) => {
                // console.log('position changes for swipe widget', position);
                positionOnChange(position);
            }
        );

        swipeWidgetRef.current.when(() => {
            addMouseEventHandlers();
        });

        // swipe widget is ready, add layers to it
        toggleDisplayLayers();
    };

    /**
     * Toggle display Land Cover and Sentinel 2 layer
     */
    const toggleDisplayLayers = () => {
        const landcoverLayers: IImageryLayer[] = [
            leadingLandCoverLayer,
            trailingLandcoverLayer,
        ];
        const sentinel2layers: IImageryLayer[] = [
            leadingSentinel2Layer,
            trailingSentinel2Layer,
        ];

        // toggle add/remove layers on map
        const layers2Add: IImageryLayer[] = shouldShowSentinel2Layer
            ? sentinel2layers
            : landcoverLayers;

        const layers2Remove: IImageryLayer[] = shouldShowSentinel2Layer
            ? landcoverLayers
            : sentinel2layers;

        mapView.map.removeMany(layers2Remove);
        mapView.map.addMany(layers2Add);

        // toggle add/remove layers on swipe widget
        const leadingLayer = shouldShowSentinel2Layer
            ? leadingSentinel2Layer
            : leadingLandCoverLayer;

        const trailingLayer = shouldShowSentinel2Layer
            ? trailingSentinel2Layer
            : trailingLandcoverLayer;

        swipeWidgetRef.current.leadingLayers.removeAll();
        swipeWidgetRef.current.leadingLayers.add(leadingLayer);

        swipeWidgetRef.current.trailingLayers.removeAll();
        swipeWidgetRef.current.trailingLayers.add(trailingLayer);
    };

    const addMouseEventHandlers = () => {
        const handleElem = document.querySelector('.esri-swipe__container');
        // console.log(handleElem)

        handleElem.addEventListener('mouseenter', () => {
            // console.log('mouseenter');
            referenceInfoOnToggle(true);
        });

        handleElem.addEventListener('mouseleave', () => {
            // console.log('mouseleave');
            referenceInfoOnToggle(false);
        });
    };

    useEffect(() => {
        // initiate swipe widget
        if (
            !swipeWidgetRef.current &&
            leadingLandCoverLayer &&
            leadingSentinel2Layer &&
            trailingLandcoverLayer &&
            trailingSentinel2Layer
        ) {
            init();
        }
    }, [
        mapView,
        leadingLandCoverLayer,
        leadingSentinel2Layer,
        trailingLandcoverLayer,
        trailingSentinel2Layer,
    ]);

    useEffect(() => {
        if (swipeWidgetRef.current) {
            toggleDisplayLayers();
        }
    }, [shouldShowSentinel2Layer]);

    useEffect(() => {
        if (swipeWidgetRef.current) {
            swipeWidgetRef.current.visible = visible;
        }
    }, [visible]);

    return null;
};

export default SwipeWidget;
