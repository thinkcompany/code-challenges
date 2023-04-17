import { Info } from '@/interfaces';
import { ChangeEvent } from 'react';

export type RideTimeSelectProps = {
    info: Info;
    selectedTime: string;
    setRideTime: (time: string) => void;
};

export const RideTimeSelect = ({
    info,
    selectedTime,
    setRideTime,
}: RideTimeSelectProps) => {
    return (
        <div className='flex flex-col border-b p-5'>
            <label className='mb-3 text-center' htmlFor='rideTime'>
                When are you riding?
            </label>
            <select
                id='rideTime'
                value={selectedTime || ''}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setRideTime(e.target.value)
                }
                className='border border-gray-300 rounded-md p-2'
            >
                <option value='' disabled>
                    Choose a time
                </option>
                <option value='weekday'>Weekdays</option>
                <option value='evening_weekend'>Evening & Weekend</option>
            </select>
            {selectedTime && (
                <p className='p-2'>{info[selectedTime as keyof typeof info]}</p>
            )}
        </div>
    );
};
