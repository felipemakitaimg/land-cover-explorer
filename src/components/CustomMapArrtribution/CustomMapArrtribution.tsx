import './style.css';
import React from 'react';

const CustomMapArrtribution = () => {
    const toggleEsriAttribution = () => {
        const element = document.querySelector('.esri-attribution');
        element.classList.toggle('show');
    };

    return (
        <div
            className="absolute left-0 bottom-0 custom-attribution-text hover:opacity-0"
            onMouseEnter={toggleEsriAttribution}
            onMouseOut={toggleEsriAttribution}
        >
            <div className="pointer-events-none">
                <span>
                    Sentinel-2 Land Cover, Powered by Esri in collaboration with
                    Microsoft and Impact Observatory
                </span>
            </div>
        </div>
    );
};

export default CustomMapArrtribution;
