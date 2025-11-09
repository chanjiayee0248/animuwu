function AnimeCardSkeleton() {
    return (
        <div className="anime-card group overflow-hidden" aria-hidden>
            {/* Rating placeholder */}
            <div className="anime-card-rating-container animate-pulse">
            </div>

            {/* Image placeholder */}
            <div className="anime-card-image object-cover aspect-3/4 w-full bg-primary-muted-standard-translucent animate-pulse" />

            {/* Content placeholder */}
            <div className="relative flex flex-col gap-1 p-2 bg-primary-muted-dark">
                <div className="h-5 w-3/4 bg-primary-muted-standard-translucent rounded animate-pulse" />
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-primary-muted-standard-translucent rounded animate-pulse" />
                        <div className="w-6 h-3 bg-primary-muted-standard-translucent rounded animate-pulse" />
                    </div>
                    <div className="w-20 h-3 bg-primary-muted-standard-translucent rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
}

export default AnimeCardSkeleton;