import { useLocation } from 'react-router-dom';

function getLastPathSegment(pathname: string): string {
    const segments = pathname.split('/').filter(Boolean);
    return segments.length ? decodeURIComponent(segments[segments.length - 1]) : '';
}

function AnimeDetailsPage() {
    const { pathname } = useLocation();
    const id = getLastPathSegment(pathname);

    return (
        <div>
            {id ? `ID: ${id}` : 'No id found in URL'}
        </div>
    );
}

export default AnimeDetailsPage;