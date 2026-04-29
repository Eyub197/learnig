export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const params = await searchParams;
	console.log(params);
	const { q = "stss" } = params;
	return <h1>Search page {q}</h1>;
}
