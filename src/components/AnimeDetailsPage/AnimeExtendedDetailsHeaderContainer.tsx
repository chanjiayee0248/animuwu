interface AnimeExtendedDetailsHeaderContainerProps {
    headerText: string;
    children: React.ReactNode;
}

function AnimeExtendedDetailsHeaderContainer({headerText,children}: AnimeExtendedDetailsHeaderContainerProps) {
    return (
        <section className={`flex flex-col gap-5`}>
            <div className={``}>
                <h4 className={`text-3xl font-bold mb-2 text-secondary-base-bright
                max-md:text-2xl max-sm:text-xl`}>
                    {headerText}
                </h4>
                <hr className="border-2 border-accent-muted-medium-translucent" />
            </div>
            {children}
        </section>
    )
}

export default AnimeExtendedDetailsHeaderContainer;