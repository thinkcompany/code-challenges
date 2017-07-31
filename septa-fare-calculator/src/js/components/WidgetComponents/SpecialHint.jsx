import React from 'react';

const SpecialHint = ({isSpecial, specialCount}) => {
    if (isSpecial) {
        return (
            <div className="special-fare-hint">
                This is a special price for {specialCount} tickets.
            </div>
        );
    } else {
        return (
            <div className="special-fare-hint"></div>
        );
    }
}

export default SpecialHint;