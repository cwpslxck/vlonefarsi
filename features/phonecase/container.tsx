"use client";
import React, { useEffect } from "react";
import Card from "./card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ContainerSkeleton from "./container-skeleton";
import CardSkeleton from "./card-skeleton";

const fetchDesignsPaginated = async ({ pageParam = 0 }) => {
  const response = await fetch(`/api/phonecase?page=${pageParam}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return {
    data: result.data,
    nextPage: result.nextPage,
  };
};

export default function Container() {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
    rootMargin: "300px",
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products", "phonecases"],
    queryFn: fetchDesignsPaginated,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    console.error("Container Error:", error);
    return (
      <div className="text-center py-8">
        <p className="text-red-500">خطا در بارگذاری داده‌ها</p>
      </div>
    );
  }

  if (status === "pending" || !data?.pages[0]?.data) {
    return <ContainerSkeleton />;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.pages.map((page, i) =>
          page.data.map((design: any) => (
            <Card
              key={design.id}
              href={`/phonecase/${design.id}`}
              image_url={design.image_url}
              name={design.name}
            />
          ))
        )}
        {isFetchingNextPage && (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
      </div>

      <div ref={ref} />
    </>
  );
}
