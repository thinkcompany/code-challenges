export interface DataProps {
    info: {
        anytime: string;
        weekday: string;
        evening_weekend: string;
        advance_purchase: string;
        onboard_purchase: string;
    },
    zones: [
        {
            name: string;
            zone: number;
            fares: [{
                type: string;
                purchase: string;
                trips: number;
                price: number;
            }]
        }
    ]
}

export interface SelectAndRadioProps {
    name: string;
    label: string;
    list: string[];
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
    ) => void;
}

