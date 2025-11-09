import {getRandomSadKaomoji} from "@/utils/getRandomSadKaomoji.ts";

const randomKaomojiThisSession = getRandomSadKaomoji();

function KaomojiErrorDisplay ({ messageHeader, messageContent }: { messageHeader: string, messageContent: string }) {
    return (
        <div className={`flex flex-col gap-4 text-center text-xl`}>
            <p aria-hidden={true} className={`text-8xl text-primary-base-standard`}>{randomKaomojiThisSession}</p>
            <h1 className={`text-6xl font-[Nunito] font-bold`}>{messageHeader}</h1>
            <p className={`text-primary-muted-bright-translucent`}>{messageContent}</p>
        </div>
    );
}

export default KaomojiErrorDisplay;