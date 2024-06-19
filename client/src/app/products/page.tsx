"use client";

import { getProducts } from "@/actions/product";
import ProductCard from "@/components/product-card";
import { Product } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Products: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const initialData = await getProducts(1);
        // console.log("🚀 ~ fetchInitialData ~ initialData:", initialData);

        setData(initialData);
        if (initialData.length < 10) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchInitialData();
  }, []);

  const fetchMoreData = async () => {
    try {
      const newData = await getProducts(page + 1);

      setData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);

      if (newData.length === 0 || newData.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4 className="text-center">Loading...</h4>}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Products;
