import Layout from "@/components/layout/Layout";

const Cart = () => {
  return (
    <Layout>
      <div className="px-6 lg:px-12 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-8">Your cart</h1>
          <p className="text-muted-foreground mb-8">Your cart is currently empty.</p>
          <a href="/shop" className="underline underline-offset-4 text-sm hover:opacity-70">
            Continue shopping
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
