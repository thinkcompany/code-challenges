import Heading from "./Heading";
import { SelectAndRadioProps } from "./Types";

const RadioGroup = ({ label, name, list, onChange }: SelectAndRadioProps) => {
    return (

        <fieldset className="radio-group">
            <legend>
                <Heading tag="h2" size="md">{label}</Heading>
            </legend>

            <div className="options">
                {list.map((option) => {
                    return (
                        <>
                            <div className="option">
                                <input type="radio" name={name} id={option} onChange={onChange} />
                                <label htmlFor={option}>{option}</label>
                            </div>

                        </>
                    );
                })}
            </div>



        </fieldset>

    );
};

export default RadioGroup;