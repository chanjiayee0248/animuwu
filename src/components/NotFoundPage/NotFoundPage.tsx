import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <div className={`w-dvw h-dvh flex flex-col gap-8 items-center justify-center p-4 text-primary-muted-standard`}>
            <h1 aria-hidden={true} className={`text-8xl text-accent-muted-standard`}>⋅˚.⋆☾⁺₊ ‧</h1>
            <h2 className={`text-4xl font-[Nunito] font-bold`}>404 - Page Not Found</h2>
            <p className={`text-xl`}>Somewhere out there, this page is living its best isekai life.</p>
            <Link to={'/'} className={`text-2xl`}>
                <button className={`px-4 py-2 rounded-3xl text-xl bg-secondary-muted-dark text-secondary-muted-bright 
                hover:brightness-150 active:brightness-90`}>
                    Return Home?
                </button>
            </Link>
        </div>
    );
}

export {NotFoundPage};