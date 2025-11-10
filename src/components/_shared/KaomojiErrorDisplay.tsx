import {getRandomSadKaomoji} from "@/utils/getRandomSadKaomoji.ts";

const randomKaomojiThisSession = getRandomSadKaomoji();

function KaomojiErrorDisplay ({ messageHeader, messageContent }: { messageHeader: string, messageContent: string }) {
    return (
        <div className={`flex flex-col gap-4 text-center text-xl text-center`}>
            <p aria-hidden={true} className={`text-8xl text-primary-base-standard
            max-lg:text-6xl max-sm:text-5xl`}>{randomKaomojiThisSession}</p>
            <h1 className={`text-6xl font-[Nunito] font-bold max-lg:text-5xl`}>{messageHeader}</h1>
            <p className={`text-primary-muted-bright-translucent max-lg:text-lg`}>{messageContent}</p>
        </div>
    );
}

export default KaomojiErrorDisplay;