import { Zone } from '@/interfaces';
import { ChangeEvent } from 'react';

export type LocationSelectProps = {
    zones: Zone[];
    selectedZone: number;
    setZone: (zone: number) => void;
};

export const LocationSelect = ({
    zones,
    selectedZone,
    setZone,
}: LocationSelectProps) => {
    return (
        <div className='flex flex-col border-b p-5'>
            <label className='mb-3 text-center' htmlFor='zone'>
                Where are you going?
            </label>
            <select
                id='zone'
                value={selectedZone || ''}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setZone(parseInt(e.target.value))
                }
                className='border border-gray-300 rounded-md p-2'
            >
                <option value='' disabled>
                    Choose a zone
                </option>
                {zones.map((z: Zone) => (
                    <option key={z.zone} value={z.zone}>
                        {z.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
