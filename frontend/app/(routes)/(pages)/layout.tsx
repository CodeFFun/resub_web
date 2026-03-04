
import Navbar from "@/components/navbar";
import { handleGetOrderByUserId } from "@/lib/actions/order-action";
import { handleGetAllSubscriptionOfAUser } from "@/lib/actions/subscription-action";
import { getUserData } from "@/lib/cookie";

export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role = await getUserData()?.role || "customer";
  const subs = await handleGetAllSubscriptionOfAUser();
  const cart = await handleGetOrderByUserId();
  console.log(cart.data.length)
  console.log(subs.data.length)
  return (
      <div>
        <Navbar role={role} subs={subs.data.length} cart={cart.data.length} />
        {children}
      </div>
  );
}
