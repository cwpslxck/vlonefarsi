import React from "react";

function ContainerSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 justify-between px-4 gap-8 flex-wrap">
      <div className="w-full aspect-9/18 rounded-3xl bg-stone-900"></div>
      <div className="w-full aspect-9/18 rounded-3xl bg-stone-900"></div>
      <div className="w-full aspect-9/18 rounded-3xl bg-stone-900"></div>
      <div className="w-full aspect-9/18 rounded-3xl bg-stone-900"></div>
      <div className="w-full aspect-9/18 rounded-3xl bg-stone-900"></div>
      <div className="w-full aspect-9/18 rounded-3xl bg-stone-900"></div>
    </div>
  );
}

export default ContainerSkeleton;
