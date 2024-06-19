import { getProducts } from "@/actions/product";
import Link from "next/link";
import ProductCard from "../product-card";
import { Button } from "../ui/button";

export default async function HomeBody() {
  const data = await getProducts(1);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 p-10">
      {data?.map((product, index) => {
        return <ProductCard key={index} product={product} />;
      })}
      <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5 justify-center items-center flex">
        <Link href={"/products"}>
          <Button>View More</Button>
        </Link>
      </div>
    </div>
  );
}
