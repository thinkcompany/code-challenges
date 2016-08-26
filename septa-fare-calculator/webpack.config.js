module.exports = {
    entry: "./scripts/septaFareCalculator.js",
    output: {
        path: __dirname + '/scripts',
        filename: "septaFareCalculatorBundle.js"
    },
    module: {
        loaders: [
             {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    }
};
