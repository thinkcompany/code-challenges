import React, { ChangeEvent } from 'react';

export type RideQuantityProps = {
    numRides: number;
    setNumRides: (numRides: number) => void;
};

export const RideQuantity = ({ numRides, setNumRides }: RideQuantityProps) => {
    return (
        <div className='flex flex-col border-b p-5 text-center items-center'>
            <label className='mb-3 text-center' htmlFor='numRides'>
                How many rides will you need?
            </label>
            <input
                type='number'
                id='numRides'
                value={numRides || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNumRides(parseInt(e.target.value))
                }
                className='border border-gray-300 rounded-md p-2 w-20'
                min={1}
            />
        </div>
    );
};
