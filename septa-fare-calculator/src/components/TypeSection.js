import { useState } from "react";
import Select from "react-select";
import { customTheme, ariaStyle } from "../util/SelectStyles";

const TypeSection = ({ prompt, typeOptions, setType, typeHelperText }) => {
    const [ariaFocusMsg, setAriaFocusMsg] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onFocus = ({ focused, isDisabled }) => {
        const msg = `You are currently focused on option ${focused.label}${isDisabled ? ', disabled' : ''}`;
        setAriaFocusMsg(msg);
        return msg;
    };

    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);

    const handleTypeChange = (value) => {
        setType(value.value);
    };

    return (
        <section className="flex-column type-section bottom-border">
            <h3
                data-testid="type-section-prompt"
                className="prompt-text"
            >{prompt}</h3>
            <label
                style={ariaStyle.label}
                id="type-aria-label"
                htmlFor="type-input"
            >
                Select a type
            </label>
            {!!ariaFocusMsg && !!isMenuOpen && (
                <blockquote
                    style={ariaStyle.blockquote}
                >{ariaFocusMsg}</blockquote>
            )}
            <Select
                aria-labelledby="type-aria-label"
                ariaLiveMessages={{ onFocus }}
                onMenuOpen={onMenuOpen}
                onMenuClose={onMenuClose}
                theme={customTheme}
                options={typeOptions}
                name="type"
                inputId="type-input"
                id="type-input"
                onChange={handleTypeChange}
                defaultValue={typeOptions[0]}
            />
            <p
                data-testid="type-section-helper"
                className="helper-text"
            >{typeHelperText}</p>
        </section>
    )
};

export default TypeSection;
