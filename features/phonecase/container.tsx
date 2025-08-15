"use client";
import React, { useEffect } from "react";
import Card from "./card";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ContainerSkeleton from "./container-skeleton";
import CardSkeleton from "./card-skeleton";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

type ContainerProps = {
  limit?: number;
};

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

const fetchDesignsRandom = async (limit: number) => {
  const response = await fetch(`/api/phonecase?limit=${limit}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result.data || [];
};

export default function Container({ limit }: ContainerProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
    rootMargin: "300px",
  });

  const {
    data: limitedData,
    isLoading: isLimitedLoading,
    error: limitedError,
  } = useQuery({
    queryKey: ["products", "phonecases", "random", limit],
    queryFn: () => fetchDesignsRandom(limit!),
    enabled: !!limit,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const {
    data: infiniteData,
    error: infiniteError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products", "phonecases"],
    queryFn: fetchDesignsPaginated,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    enabled: !limit,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !limit) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, limit]);

  // Handle errors
  if (limitedError || infiniteError) {
    console.error("Container Error:", limitedError || infiniteError);
    return (
      <div className="text-center py-8">
        <p className="text-red-500">خطا در بارگذاری داده‌ها</p>
      </div>
    );
  }

  if (limit) {
    if (isLimitedLoading || !limitedData || limitedData.length === 0)
      return <ContainerSkeleton />;

    return (
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl text-center font-semibold">قاب‌های پیشنهادی</p>
          <Link
            href={"/phonecase"}
            className="flex justify-center py-2 font-light text-sm items-center gap-1"
          >
            مشاهده همه
            <ArrowDown className="rotate-225 size-5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {limitedData.map((design: any) => (
            <Card
              key={design.id}
              href={`/phonecase/${design.id}`}
              image_url={design.image_url}
              name={design.name}
            />
          ))}
        </div>
      </div>
    );
  }

  if (
    status === "pending" ||
    !infiniteData?.pages[0]?.data ||
    infiniteData.pages[0].data.length === 0
  )
    return <ContainerSkeleton />;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {infiniteData.pages.map((page, i) =>
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
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}
      </div>

      <div ref={ref} />
    </>
  );
}
