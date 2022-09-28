import classNames from 'classnames';
import React, { FC, useRef } from 'react';
import useGetTooltipPositionOnHover from '../../../hooks/useGetTooltipPositionOnHover';
import {
    LandCoverClassification,
    LandcoverClassificationData,
} from '../../../services/sentinel-2-10m-landcover/rasterAttributeTable';
import { TooltipData } from '../../../store/UI/reducer';
import HeaderText from '../HeaderText/HeaderText';

type Props = {
    /**
     * array of Land Cover classifications data (from Sentinel2_10m_LandCover layer) that contains Name, Color and Description of each land cover type
     */
    data: LandcoverClassificationData[];
    /**
     * a specific land cover type selected by the user that will be used to filter the Land Cover Layer
     */
    selectedLandCover: LandCoverClassification;
    /**
     * Fires when user clicks a land cover item in the list
     */
    activeLandCoverOnChange: (data?: LandCoverClassification) => void;
    /**
     * Fires when users hovers a land cover item in th list
     */
    itemOnHover: (data?: TooltipData) => void;
};

const ClassificationsList: FC<Props> = ({
    data,
    selectedLandCover,
    itemOnHover,
    activeLandCoverOnChange,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>();
    useGetTooltipPositionOnHover(containerRef);

    return (
        <div className="text-center mx-4 mt-4 md:mt-0" ref={containerRef}>
            <HeaderText text="Land Cover Categories, Click to Toggle Visibility" />

            <div className="grid grid-cols-3 h-28 text-sm mt-8">
                {data
                    .filter((d) => d.ClassName !== 'No Data')
                    .map((d: LandcoverClassificationData) => {
                        const { Value, ClassName, Color, Description } = d;

                        const [Red, Green, Blue] = Color;

                        const isSelected = ClassName === selectedLandCover;

                        return (
                            <div
                                key={Value}
                                className={classNames(
                                    'flex items-center cursor-pointer',
                                    {
                                        'opacity-50':
                                            selectedLandCover &&
                                            isSelected === false,
                                    }
                                )}
                                onClick={() => {
                                    const newVal =
                                        isSelected === false ? ClassName : null;

                                    activeLandCoverOnChange(newVal);
                                }}
                                onMouseEnter={() => {
                                    itemOnHover({
                                        title: ClassName,
                                        content: Description,
                                    });
                                }}
                                onMouseLeave={() => {
                                    itemOnHover(null);
                                }}
                            >
                                <div
                                    className="w-4 h-4 border-2 border-white rounded-full"
                                    style={{
                                        background: `rgb(${Red}, ${Green}, ${Blue})`,
                                    }}
                                ></div>

                                <span className="ml-2">{ClassName}</span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ClassificationsList;
