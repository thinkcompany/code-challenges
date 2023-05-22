export const getTransformedLabel = (label: string) => {
	// replace "_" with '/'
	return label
		.split("_")
		.map((ch) => ch[0].toUpperCase() + ch.substring(1))
		.join("/");
};
