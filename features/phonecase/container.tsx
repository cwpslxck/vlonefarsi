"use client";
import React from "react";
import Card from "./card";
import { supabase } from "@/lib/supbabase/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import ContainerSkeleton from "./container-skeleton";
import CardSkeleton from "./card-skeleton";

const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const INITIAL_PAGE_SIZE = 12;
const SUBSEQUENT_PAGE_SIZE = 6;

const fetchDesigns = async ({ pageParam = 0 }) => {
  // تعیین اندازه صفحه بر اساس اینکه اولین درخواست است یا خیر
  const pageSize = pageParam === 0 ? INITIAL_PAGE_SIZE : SUBSEQUENT_PAGE_SIZE;

  const { data, error } = await supabase
    .from("designs")
    .select("*")
    .range(pageParam, pageParam + pageSize - 1)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return {
    data,
    nextPage: data.length === pageSize ? pageParam + pageSize : undefined,
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
    queryFn: fetchDesigns,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") {
    return <ContainerSkeleton />;
  }

  if (!data?.pages[0]?.data || data.pages[0].data.length === 0) {
    return <div>Miaw net nadari :9</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 justify-between px-4 gap-8 flex-wrap">
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.data.map((design) => (
              <Card
                href={`/phonecase/${createSlug(design.name)}`}
                image_url={design.image_url}
                name={design.name}
                key={design.id}
              />
            ))}
          </React.Fragment>
        ))}

        {isFetchingNextPage ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <span></span>
        )}
      </div>
      <div ref={ref} className="h-1 w-full"></div>
    </>
  );
}
