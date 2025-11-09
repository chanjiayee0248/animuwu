import AnimeExtendedDetailsHeaderContainer from "@/components/AnimeDetailsPage/AnimeExtendedDetailsHeaderContainer.tsx";
import {disableUrlEmbedAutoplay} from "@/utils/disableUrlEmbedAutoplay.ts";
import type {JikanAnimeMalUrlResourceInterface} from "@/services/jikanApi/api/jikanApiResponseTypes.ts";
import {ExternalLinkIcon} from "lucide-react";

interface AnimeExtendedDetailsProps {
    synopsis: string | null;
    background: string | null;
    trailerEmbedUrl: string | null;
    studios: JikanAnimeMalUrlResourceInterface[];
}

export function AnimeExtendedDetails({
                                         synopsis,
                                         background,
                                         trailerEmbedUrl,
                                         studios
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
            {
                studios.length > 0 &&
                <AnimeExtendedDetailsHeaderContainer headerText={"Studios"}>
                    <ul className={`flex flex-wrap gap-3 text-primary-greyed-bright`}>
                        {
                            studios.map((studio) => (
                                <li key={studio.mal_id} className={`list-none`}>
                                    <div className={`bg-primary-muted-superdark-translucent px-3 py-1 rounded-lg inline-block`}>
                                        {studio.url ? (
                                            <a
                                                href={studio.url}
                                                target={"_blank"}
                                                rel={"noopener noreferrer"}
                                                className={`inline-flex items-center gap-2 hover:underline`}
                                            >
                                                {studio.name}
                                                <ExternalLinkIcon className={`w-3 h-3`} />
                                            </a>
                                        ) : (
                                            <span>{studio.name}</span>
                                        )}
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </AnimeExtendedDetailsHeaderContainer>
            }

        </div>
    )
}