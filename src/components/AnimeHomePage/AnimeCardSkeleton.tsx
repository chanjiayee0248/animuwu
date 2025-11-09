function AnimeCardSkeleton() {
    return (
        <div className="anime-card group overflow-hidden hover:scale-[1.04] active:scale-[0.98] transition-transform duration-100 ease-in-out" aria-hidden>
            {/* Rating placeholder */}
            <div className="anime-card-rating-container flex justify-center items-center animate-pulse">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-primary-muted-medium-translucent rounded animate-pulse max-md:w-2 max-md:h-2" />
                    <div className="w-6 h-3 bg-primary-muted-medium-translucent rounded animate-pulse max-md:w-5 max-md:h-2" />
                </div>
            </div>

            {/* Image placeholder */}
            <div className="anime-card-image object-cover aspect-3/4 w-full bg-primary-muted-standard-translucent animate-pulse" />

            {/* Content placeholder */}
            <div className="relative flex flex-col gap-1 p-2 text-sm font-bold bg-primary-muted-dark">
                <div className={`pb-2 h-5 w-3/4 bg-primary-muted-standard-translucent rounded animate-pulse max-md:h-4 max-md:w-4/5`} />
                <div className="flex flex-wrap justify-between items-center text-xs font-semibold">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-primary-muted-standard-translucent rounded animate-pulse max-md:hidden" />
                        <div className="w-6 h-3 bg-primary-muted-standard-translucent rounded animate-pulse" />
                    </div>
                    <div className="w-20 h-3 bg-primary-muted-standard-translucent rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
}

export default AnimeCardSkeleton;