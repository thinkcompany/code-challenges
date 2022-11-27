interface TextProps {
    size?: "sm" | "lg" | "helper";
    children: string;
}

const Text = ({ size, children }: TextProps) => {
    return (
        <p className={size ? size : ''}>{children}</p>
    );
};

export default Text;