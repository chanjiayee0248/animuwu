import AnimeExtendedDetailsHeaderContainer from "@/components/AnimeDetailsPage/AnimeExtendedDetailsHeaderContainer.tsx";
import {disableUrlEmbedAutoplay} from "@/utils/disableUrlEmbedAutoplay.ts";

interface AnimeExtendedDetailsProps {
    synopsis: string | null;
    background: string | null;
    trailerEmbedUrl: string | null;
}

export function AnimeExtendedDetails({
                                         synopsis,
                                         background,
                                         trailerEmbedUrl
                                     }: AnimeExtendedDetailsProps) {


    return (
        <div className={`w-full h-full flex flex-col gap-16 p-[5%] bg-primary-muted-dark`}>
            {
                (!synopsis && !background && !trailerEmbedUrl) &&
                <p className={``}>No additional information available.</p>
            }
            {
                synopsis &&
                <AnimeExtendedDetailsHeaderContainer headerText={"Synopsis"}>
                    <p className={`whitespace-pre-line text-justify text-primary-greyed-bright leading-snug`}>
                        {synopsis}
                    </p>
                </AnimeExtendedDetailsHeaderContainer>
            }
            {
                background &&
                <AnimeExtendedDetailsHeaderContainer headerText={"Background"}>
                    <p className={`whitespace-pre-line text-justify text-primary-greyed-bright leading-snug`}>
                        {background}
                    </p>
                </AnimeExtendedDetailsHeaderContainer>
            }
            {
                trailerEmbedUrl &&
                <AnimeExtendedDetailsHeaderContainer headerText={"Trailer"}>
                    <div className={`w-full aspect-video`}>
                        <iframe
                            src={disableUrlEmbedAutoplay(trailerEmbedUrl)}
                            title="Anime Trailer"
                            className={`w-full h-full rounded-lg`}
                            allowFullScreen
                        ></iframe>
                    </div>
                </AnimeExtendedDetailsHeaderContainer>
            }

        </div>
    )
}