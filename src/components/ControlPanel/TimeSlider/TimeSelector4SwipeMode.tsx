import classNames from 'classnames';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    getAvailableYears,
    getAvailableDays,
} from '../../../services/sentinel-2-10m-landcover/timeInfo';
import {
    year4LeadingLayerUpdated,
    year4TrailingLayerUpdated,
    day4LeadingLayerUpdated,
    day4TrailingLayerUpdated,
} from '../../../store/Map/reducer';
import {
    selectYearsForSwipeWidgetLayers,
    selectDaysForSwipeWidgetLayers,
} from '../../../store/Map/selectors';
import Dropdown from './Dropdown';
import ScrollingDropdown from './ScrollingDropdown';
import MonthPicker from './MonthPicker';
import DayPicker from './DayPicker';

type Props = {
    shouldShowMonthPicker: boolean;
    shouldShowDayPicker: boolean;
};

const TimeSelector4SwipeMode: FC<Props> = ({
    shouldShowMonthPicker,
    shouldShowDayPicker,
}: Props) => {
    const dispatch = useDispatch();

    const years = getAvailableYears();
    const days = getAvailableDays();

    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const { day4LeadingLayer, day4TrailingLayer } = useSelector(
        selectDaysForSwipeWidgetLayers
    );

    const data4LeadingYearDropdown = years.map((year) => {
        return {
            value: year.toString(),
            active: year === year4LeadingLayer,
        };
    });

    const data4LeadingDayDropdown = days.map((day) => {
        return {
            value: day.toString(),
            active: day === day4LeadingLayer,
        };
    });

    const data4TrailingYearDropdown = years.map((year) => {
        return {
            value: year.toString(),
            active: year === year4TrailingLayer,
        };
    });

    const data4TrailingDayDropdown = days.map((day) => {
        return {
            value: day.toString(),
            active: day === day4TrailingLayer,
        };
    });

    return (
        <div className="mt-8 flex">
            <div
                className={classNames('grid grid-cols-2 gap-2 mr-2', {
                    'w-4/5': shouldShowMonthPicker,
                    'w-full': shouldShowMonthPicker === false,
                })}
            >
                <Dropdown
                    data={data4LeadingYearDropdown}
                    onChange={(year) => {
                        dispatch(year4LeadingLayerUpdated(+year));
                    }}
                />

                <MonthPicker />

                <ScrollingDropdown
                    data={data4LeadingDayDropdown}
                    onChange={(day) => {
                        dispatch(day4LeadingLayerUpdated(+day));
                    }}
                />
            </div>

            <div className="relative border-l border-custom-light-blue-50 ml-1 pl-3"></div>

            <div
                className={classNames('grid grid-cols-2 gap-2 mr-2', {
                    'w-4/5': shouldShowMonthPicker,
                    'w-full': shouldShowMonthPicker === false,
                })}
            >
                <Dropdown
                    data={data4TrailingYearDropdown}
                    onChange={(year) => {
                        dispatch(year4TrailingLayerUpdated(+year));
                    }}
                />

                <MonthPicker />

                <ScrollingDropdown
                    data={data4TrailingDayDropdown}
                    onChange={(day) => {
                        dispatch(day4TrailingLayerUpdated(+day));
                    }}
                />
            </div>

            {/* {shouldShowMonthPicker && (
                <div className="relative border-l border-custom-light-blue-50 ml-1 pl-3">
                    <MonthPicker />
                </div>
            )} */}

            {/* {shouldShowDayPicker && (
                <div className="relative border-l border-custom-light-blue-50 ml-1 pl-3">
                    <MonthPicker />
                </div>
            )} */}
        </div>
    );
};

export default TimeSelector4SwipeMode;
