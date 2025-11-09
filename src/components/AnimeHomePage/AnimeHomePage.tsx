import AnimeSearchFilterDropdowns from "@/components/AnimeHomePage/AnimeSearchFilterDropdowns";
import AnimeSearchBar from "@/components/AnimeHomePage/AnimeSearchBar";
import AnimeCardGrid from "@/components/AnimeHomePage/AnimeCardGrid.tsx";


function AnimeHomePage() {
    return (
        <div className={`flex flex-col items-center w-full`}>
            <header className={`flex flex-col items-center w-full pt-10 py-8 gap-1`}>
                <h1 className={`text-6xl font-semibold font-[Nunito] text-center text-primary-base-bright`}>
                    Anim<span className={`font-bold font-[Playpen_Sans] text-secondary-vivid-bright`}>UwU</span>
                </h1>
                <p className={`text-xl font-semibold font-[Nunito] italic text-center text-accent-muted-standard`}>
                    ~ Your Friendly Anime Search Pal ~
                </p>
            </header>
            <section className={`flex flex-col gap-6 items-center w-full`}>
                <AnimeSearchBar/>
                <AnimeSearchFilterDropdowns/>
                <AnimeCardGrid/>
            </section>
        </div>
    );
}

export default AnimeHomePage;