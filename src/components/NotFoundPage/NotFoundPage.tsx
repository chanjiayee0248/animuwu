import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <div className={`w-dvw h-dvh flex flex-col gap-8 text-center items-center justify-center p-4`}>
            <p aria-hidden={true} className={`text-8xl text-accent-muted-standard
            max-lg:text-6xl`}>⋅˚.⋆☾⁺₊ ‧</p>
            <h1 className={`text-4xl font-[Nunito] font-bold max-lg:text-3xl`}>404 - Page Not Found</h1>
            <p className={`text-xl`}>Somewhere out there, this page is living its best isekai life.</p>
            <Link
                to="/"
                className="inline-block px-4 py-2 rounded-3xl text-xl bg-secondary-muted-dark text-secondary-muted-bright
               hover:brightness-150 active:brightness-90"
            >
                Return Home?
            </Link>

        </div>
    );
}

export {NotFoundPage};