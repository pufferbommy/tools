export const seo = ({
	title,
	description,
	keywords,
	image,
}: {
	title?: string;
	description?: string;
	image?: string;
	keywords?: string;
}) => {
	const baseTitle = "รวมมิตรเครื่องมือ";
	const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;

	const tags = [
		{ title: fullTitle },
		{ name: "description", content: description },
		{ name: "keywords", content: keywords },
		{ name: "author", content: "ruammittools.com" },
		{ name: "publisher", content: "ruammittools.com" },
		{ name: "twitter:title", content: fullTitle },
		{ name: "twitter:description", content: description },
		{ name: "twitter:creator", content: "@ruammittools" },
		{ name: "twitter:site", content: "@ruammittools" },
		{ name: "og:type", content: "website" },
		{ name: "og:title", content: fullTitle },
		{ name: "og:description", content: description },
		...(image
			? [
					{ name: "og:image", content: image },
					{ name: "twitter:image", content: image },
					{ name: "twitter:card", content: "summary_large_image" },
				]
			: []),
	];

	return tags;
};
