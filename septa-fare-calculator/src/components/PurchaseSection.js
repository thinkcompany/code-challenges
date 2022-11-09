const PurchaseSection = ({ prompt, purchaseOptions, purchase, setPurchase }) => {
    const handlePurchaseChange = e => {
        console.log(e.target.value);
        setPurchase(e.target.value);
    };

    return (
        <section className="flex-column purchase-section bottom-border">
            <h3
                data-testid="purchase-section-prompt"
                className="prompt-text"
            >{prompt}</h3>
            <div className="flex-column purchase-options">
                {purchaseOptions?.map(option => (
                    <label
                        key={option.value}
                        htmlFor={option.value}
                    >
                        <input
                            type="radio"
                            name="purchase"
                            data-testid={option.value}
                            value={option.value}
                            checked={option.value === purchase}
                            onChange={handlePurchaseChange}
                        />
                        {option.label}
                    </label>
                ))}
                <input
                    data-testid="purchase"
                    value={purchase}
                    hidden
                    readOnly
                />
            </div>
        </section>
    )
};

export default PurchaseSection;
