interface HeadingProps {
    tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    size: "xs" | "sm" | "md" | "lg" | "xlg";
    children: string;

}

const Heading = ({ tag, size, children }: HeadingProps) => {

    const AccessibleHeading = tag;
    return (
        <AccessibleHeading className={`heading ${size}`}>{children}</AccessibleHeading>
    );
};

export default Heading;