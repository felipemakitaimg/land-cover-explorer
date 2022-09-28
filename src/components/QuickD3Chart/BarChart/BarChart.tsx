// import './style.css';
import React, { useState, useEffect, useMemo, useCallback } from 'react';

import {
    ScaleBand,
    scaleLinear,
    scaleTime,
    ScaleLinear,
    ScaleTime,
    AxisScale,
    scaleBand,
    max,
    min,
} from 'd3';

import {
    // SvgContainerData,
    Dimension,
    Margin,
} from '../types';

import {
    Bars,
    SvgContainer,
    XAxis,
    // YAxis,
    // PointerEventsOverlay,
    // Tooltip,
} from '../elements';

// import { PointerPositionOnHover } from '../elements/PointerEventsOverlay';

import {
    QuickD3ChartData,
    // QuickD3ChartDataItem
} from '../types';
import { SCALE_BAND_PADDING_INNER } from '../constants';
import BarTextLabel from '../elements/BarTextLabel';
import VerticalDividerLine4Bars from '../elements/VerticalDividerLine4Bars';

type XScale =
    | ScaleBand<string | number>
    | ScaleTime<number, number>
    | ScaleLinear<number, number>;
type YScale = ScaleLinear<number, number>;

type Props = {
    data4Bars?: QuickD3ChartData;
    barColor?: string;
    margin?: Margin;
    timeFormatSpecifier?: string;
    //if specified, use list of tick values for x axis
    // xScaleTickValues?: (string | number)[];
    // specify this value to show only 1 in every n ticks on x axis so it won't be crowded
    numOfTicksOnXAxisToHide?: number;
    showAxis?: boolean;
    resizable?: boolean;
    /**
     * If true, display vertical divider line between bars
     */
    showVerticalDividerLines?: boolean;
    /**
     * If true, show text label on top of container for each bar
     */
    showLabelOnTop?: boolean;
    /**
     * If true, show text label for each bar
     */
    showValueLabel?: boolean;
    /**
     * use this value to adjust the style (height, opacity) of divider line to make it easier to separate groups visualy
     */
    numberOfBarsPerGroup: number;
};

const BarChart: React.FC<Props> = ({
    data4Bars = [],
    barColor,
    margin,
    timeFormatSpecifier,
    // xScaleTickValues,
    numOfTicksOnXAxisToHide,
    showAxis = true,
    resizable = true,
    showVerticalDividerLines,
    showLabelOnTop,
    showValueLabel,
    numberOfBarsPerGroup,
}) => {
    const [dimension, setDimension] = useState<Dimension>({
        height: 0,
        width: 0,
    });

    // const [pointerPositionOnHover, setPointerPositionOnHover] =
    //     useState<PointerPositionOnHover>();

    const xDomain = useMemo(() => {
        if (!data4Bars.length) {
            return [];
        }

        return data4Bars.map((d) => {
            return typeof d.key === 'number' ? d.key.toString() : d.key;
        });
    }, [data4Bars]);

    const xScale = useMemo((): XScale => {
        const { width } = dimension;

        return scaleBand()
            .paddingInner(SCALE_BAND_PADDING_INNER)
            .paddingOuter(0.1)
            .range([0, width])
            .domain(xDomain);
    }, [dimension, xDomain]);

    const yScale = useMemo((): YScale => {
        const { height } = dimension;

        const ymax4Bars =
            data4Bars && data4Bars.length ? max(data4Bars, (d) => d.value) : 0;

        // let's make the ymax bigger than the actual value to give some padding space on top and bottom
        const ymax = ymax4Bars * 1.2;

        const ymin = 0;

        return scaleLinear<number, number>()
            .range([height, 0])
            .domain([ymin, ymax]);
    }, [dimension, data4Bars]);

    // const xScaleTickValues = useMemo(() => {
    //     if (!numOfTicksOnXAxisToHide || numOfTicksOnXAxisToHide <= 1) {
    //         return undefined;
    //     }

    //     return data4Bars
    //         .map((d) => d.key)
    //         .filter((d, i) => {
    //             return !(i % numOfTicksOnXAxisToHide);
    //         });
    // }, [data4Bars]);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
            }}
        >
            <SvgContainer
                margin={margin}
                resizable={resizable}
                dimensionOnChange={setDimension}
            >
                {data4Bars && data4Bars.length ? (
                    <Bars
                        data={data4Bars}
                        xScale={xScale as ScaleBand<string | number>}
                        yScale={yScale}
                        color={barColor}
                    />
                ) : (
                    <></>
                )}

                {showAxis ? (
                    <XAxis
                        scale={xScale as AxisScale<string | number>}
                        timeFormatSpecifier={timeFormatSpecifier}
                        // tickValues={xScaleTickValues}
                    />
                ) : (
                    <></>
                )}

                {/* {showAxis ? <YAxis scale={yScale} /> : <></>} */}

                {showVerticalDividerLines ? (
                    <VerticalDividerLine4Bars
                        data={data4Bars}
                        xScale={xScale as ScaleBand<string | number>}
                        yScale={yScale}
                        numberOfBarsPerGroup={numberOfBarsPerGroup}
                    />
                ) : (
                    <></>
                )}

                {showLabelOnTop ? (
                    <BarTextLabel
                        data={data4Bars}
                        xScale={xScale as ScaleBand<string | number>}
                        yScale={yScale}
                        stickToTop={true}
                        shouldRotate={true}
                    />
                ) : (
                    <></>
                )}

                {showValueLabel ? (
                    <BarTextLabel
                        data={data4Bars}
                        xScale={xScale as ScaleBand<string | number>}
                        yScale={yScale}
                    />
                ) : (
                    <></>
                )}
            </SvgContainer>

            {/* <Tooltip
                pointerPosition={pointerPositionOnHover}
                dimension={dimension}
                data4Bars={data4Bars}
                margin={margin}
            /> */}
        </div>
    );
};

export default BarChart;
