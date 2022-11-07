import { useState } from 'react';
import Select from "react-select";
import { customTheme, ariaStyle } from "../util/SelectStyles";

const ZoneSection = ({ prompt, zoneOptions, setZoneId }) => {
    const [ariaFocusMsg, setAriaFocusMsg] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onFocus = ({ focused, isDisabled }) => {
        const msg = `You are currently focused on option ${focused.label}${isDisabled ? ', disabled' : ''
            }`;
        setAriaFocusMsg(msg);
        return msg;
    };

    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);

    const handleZoneChange = (value) => {
        setZoneId(value.value);
    };

    return (
        <section className="flex-column zone-section bottom-border">
            <h3
                data-testid="zone-section-prompt"
                className="prompt-text"
            >{prompt}</h3>
            <label
                style={ariaStyle.label}
                id="aria-label"
                htmlFor="zone-id-input"
            >
                Select a zone
            </label>
            {!!ariaFocusMsg && !!isMenuOpen && (
                <blockquote
                    style={ariaStyle.blockquote}
                >"{ariaFocusMsg}"</blockquote>
            )}
            <Select
                aria-labelledby="aria-label"
                ariaLiveMessages={{ onFocus }}
                onMenuOpen={onMenuOpen}
                onMenuClose={onMenuClose}
                theme={customTheme}
                options={zoneOptions}
                name="zone-id"
                inputId="zone-id-input"
                id="zone-id-input"
                onChange={handleZoneChange}
                defaultValue={zoneOptions[0]}
            />
        </section>
    )
};

export default ZoneSection;
