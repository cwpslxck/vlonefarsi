"use client";
import React, { useEffect } from "react";
import Card from "./card";
import { supabase } from "@/lib/supabase/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ContainerSkeleton from "./container-skeleton";
import CardSkeleton from "./card-skeleton";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

type ContainerProps = {
  limit?: number;
};

const createSlug = (text: string) => {
  return text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const INITIAL_PAGE_SIZE = 6;
const SUBSEQUENT_PAGE_SIZE = 4;

const fetchDesignsPaginated = async ({ pageParam = 0 }) => {
  const pageSize = pageParam === 0 ? INITIAL_PAGE_SIZE : SUBSEQUENT_PAGE_SIZE;

  const { data, error } = await supabase
    .from("designs")
    .select("*")
    .range(pageParam, pageParam + pageSize - 1)
    .order("design", { ascending: false });

  if (error) throw error;

  return {
    data,
    nextPage: data.length === pageSize ? pageParam + pageSize : undefined,
  };
};

const fetchDesignsLimited = async (limit: number) => {
  const { data, error } = await supabase
    .from("designs")
    .select("*")
    .limit(limit)
    .order("design", { ascending: false });

  if (error) throw error;
  return data;
};

export default function Container({ limit }: ContainerProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
    rootMargin: "300px",
  });

  // حالت limit مشخص شده
  const {
    data: limitedData,
    isLoading: isLimitedLoading,
    error: limitedError,
  } = useQuery({
    queryKey: ["products", "phonecases", limit],
    queryFn: () => fetchDesignsLimited(limit!),
    enabled: !!limit,
    staleTime: 1000 * 60 * 10,
  });

  // حالت infinite
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
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, inView, limit]);

  if (limit) {
    if (isLimitedLoading || !limitedData || limitedData.length === 0)
      return <ContainerSkeleton />;

    return (
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl text-center font-semibold">جدیدترین قاب‌ها</p>
          <Link
            href={"/phonecase"}
            className="flex justify-center py-2 font-light text-sm items-center gap-1"
          >
            مشاهده همه
            <ArrowDown className="rotate-225 size-5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {limitedData.map((design) => (
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
          page.data.map((design) => (
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
