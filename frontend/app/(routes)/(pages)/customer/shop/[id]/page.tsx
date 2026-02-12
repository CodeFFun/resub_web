import ShopDetail from "../../_components/shop/shop-details";

export default async function ShopPage({ params }: { params: { id: string } }) {
    const { id } = await params
  return <ShopDetail id={id} />
}
