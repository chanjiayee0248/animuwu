import { useParams } from 'react-router-dom';

type Params = {
    animeId?: string;
};

function AnimeDetailsPage() {
    const { animeId } = useParams<Params>();

    return (
        <div>
            {animeId ? `ID: ${animeId}` : 'No id found in URL'}
        </div>
    );
}

export default AnimeDetailsPage;