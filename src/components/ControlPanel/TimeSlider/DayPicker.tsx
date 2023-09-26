import classNames from 'classnames';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { sentinel2AquisitionDayChanged } from '../../../store/Map/reducer';
import { selectSentinel2AquisitionDay } from '../../../store/Map/selectors';
import { saveActiveDayToHashParams } from '../../../utils/URLHashParams';

const DAY_ABBR = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
];

type Props = {
    disabled?: boolean;
};

const DayPicker: FC<Props> = ({ disabled }: Props) => {
    const dispatch = useDispatch();

    const day = useSelector(selectSentinel2AquisitionDay);

    const [shouldShowOptions, setShouldShowOptions] = useState(false);

    const containerRef = useRef<HTMLDivElement>();

    useOnClickOutside(containerRef, () => {
        setShouldShowOptions(false);
    });

    useEffect(() => {
        saveActiveDayToHashParams(day);
    }, [day]);

    return (
        <div
            ref={containerRef}
            className={classNames({
                'disabled-when-animation-mode-is-on': disabled,
            })}
        >
            <div
                className="border border-custom-light-blue-50 opacity-80 p-1 text-xs cursor-pointer flex items-center"
                onClick={() => {
                    setShouldShowOptions(true);
                }}
            >
                <span className="mr-1">{DAY_ABBR[day - 1]}</span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    height="16"
                    width="16"
                >
                    <path fill="currentColor" d="M13.1 6L8 11.1 2.9 6z" />
                    <path fill="none" d="M0 0h16v16H0z" />
                </svg>
            </div>

            {shouldShowOptions && (
                <div className="absolute bottom-0 left-0 right-0 bg-custom-background border border-custom-light-blue-50 border-b-0 text-xs">
                    {DAY_ABBR.map((dayAbbr, index) => {
                        return (
                            <div
                                className="p-1 border-custom-light-blue-50 border-b cursor-pointer"
                                key={dayAbbr}
                                onClick={() => {
                                    dispatch(
                                        sentinel2AquisitionDayChanged(index + 1)
                                    );
                                    setShouldShowOptions(false);
                                }}
                            >
                                {dayAbbr}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DayPicker;
