const ResultSection = ({ prompt, total }) => {
    return (
        <section className="flex-column result-section inverted-colors">
            <h3
                data-testid="result-section-prompt"
                className="prompt-text">{prompt}</h3>
            <h1
                data-testid="result-total"
                className="result-text"
            >{total}</h1>
        </section>
    )
};

export default ResultSection;
