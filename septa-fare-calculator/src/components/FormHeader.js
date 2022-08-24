import Logo from "./Logo";

const FormHeader = ({ title }) => {
    return (
        <header className="flex-row inverted-colors">
            <div id="form-logo">
                <Logo />
            </div>
            <h2
                data-testid="header-title"
                className="title-text mid-size"
            >{title}</h2>
        </header>
    )
};

export default FormHeader;
