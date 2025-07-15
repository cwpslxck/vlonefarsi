function ContainerSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 justify-between gap-4 flex-wrap pointer-events-none">
      <div className="aspect-[9/18] w-full bg-stone-900 rounded-2xl md:rounded-3xl"></div>
      <div className="aspect-[9/18] w-full bg-stone-900 rounded-2xl md:rounded-3xl"></div>
      <div className="aspect-[9/18] w-full bg-stone-900 rounded-2xl md:rounded-3xl"></div>
      <div className="aspect-[9/18] w-full bg-stone-900 rounded-2xl md:rounded-3xl"></div>
      <div className="aspect-[9/18] w-full bg-stone-900 rounded-2xl md:rounded-3xl"></div>
      <div className="aspect-[9/18] w-full bg-stone-900 rounded-2xl md:rounded-3xl"></div>
    </div>
  );
}

export default ContainerSkeleton;
