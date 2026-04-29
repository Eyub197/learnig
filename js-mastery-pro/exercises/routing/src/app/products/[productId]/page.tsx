async function ProductInfo({
	params,
}: {
	params: Promise<{ productId: string }>;
}) {
	const { productId } = await params;

	return <div>Product Info {productId} </div>;
}

export default ProductInfo;
