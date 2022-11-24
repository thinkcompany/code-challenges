import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {humanize} from '../utils/formatString';

const StyledDropdown = styled.select`
    width: 100%;
    padding: 1rem;
    border: .1rem solid #C7C7C7;
    border-radius: .4rem;
    background: #fff url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='caret-down' class='svg-inline--fa fa-caret-down fa-w-10' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 512'%3E%3Cpath fill='%23666562' d='M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z'%3E%3C/path%3E%3C/svg%3E") no-repeat calc(100% - 16px) center;
    appearance: none;
    font-size: 1rem;
`;
const StyledHelperText = styled.p`
    color: grey;
`;
const Dropdown = (props) => {
    const {zones, info, hasHelperText, omitOption, onChange} = props;

    const [helperText, setHelperText] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        if (hasHelperText && selectedValue) {
            setHelperText(info[selectedValue]);
        }
    }, [selectedValue]);

    const handleSelect = (e) => {
        const {value} = e.target;

        setSelectedValue(value);
        onChange(value);
    };

    return (
        <div>
            <StyledDropdown
                value={selectedValue}
                onChange={handleSelect}
            >
                <option disabled value={''}>Select</option>
                {zones && zones.map((zone) => (
                    <option
                        value={zone.zone}
                        key={zone.zone}
                    >
                        {zone.name}
                    </option>
                ))}
                {info && Object.keys(info).map((key) => (
                    !key.includes(omitOption) && <option
                        value={key}
                        key={key}
                    >
                        {humanize(key)}
                    </option>
                ))}
            </StyledDropdown>
            {hasHelperText && helperText && <StyledHelperText>{helperText}</StyledHelperText>}
        </div>
    );
};

export default Dropdown;
