import Heading from "./Heading";
import { SelectAndRadioProps } from "./Types";


const Select = ({ label, name, list, disabled, onChange }: SelectAndRadioProps) => {
    return (
        <div className={`select ${disabled ? 'disabled' : ''}`}>
            <label htmlFor={name}>
                <Heading tag="h2" size="md">{label}</Heading>
            </label>

            <select name={name} id={name} onChange={onChange} disabled={disabled ? disabled : false}>
                {list.map((option) => {
                    return <option key={option} value={option}>{option}</option>;
                })}
            </select>
        </div>
    );
};

export default Select;