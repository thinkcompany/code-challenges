import React, { ChangeEvent } from 'react';

export type PurchaseLocationProps = {
    purchaseLocation: string;
    setPurchaseLocation: (location: string) => void;
};

export const PurchaseLocation = ({
    purchaseLocation,
    setPurchaseLocation,
}: PurchaseLocationProps) => {
    return (
        <div className='flex flex-col border-b p-5'>
            <label className='mb-3 text-center'>
                Where will you purchase the fare?
            </label>
            <div className='mx-auto text-left'>
                <div className='flex items-center space-x-2'>
                    <input
                        type='radio'
                        id='advance_purchase'
                        name='purchaseLocation'
                        value='advance_purchase'
                        checked={purchaseLocation === 'advance_purchase'}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPurchaseLocation(e.target.value)
                        }
                    />
                    <label htmlFor='advance_purchase'>Station Kiosk</label>
                </div>
                <div className='flex items-center space-x-2'>
                    <input
                        type='radio'
                        id='onboard_purchase'
                        name='purchaseLocation'
                        value='onboard_purchase'
                        checked={purchaseLocation === 'onboard_purchase'}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPurchaseLocation(e.target.value)
                        }
                    />
                    <label htmlFor='onboard_purchase'>Onboard</label>
                </div>
            </div>
        </div>
    );
};
