function ContainerSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 justify-between md:px-4 gap-4 md:gap-8 flex-wrap pointer-events-none">
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
