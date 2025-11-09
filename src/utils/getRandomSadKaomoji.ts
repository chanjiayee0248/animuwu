export function getRandomSadKaomoji() {
    const sadKaomojis = ["(ʘᗩʘ’)", "( ╥ω╥ )","( ˶°ㅁ°)!!","Σ(OДO ᵕ)","(」°ロ°)」","(⊙_☉)", "(っ◞‸◟ c)", "(ㅠ﹏ㅠ)","°՞(˃ ᗝ ˂)՞°"];
    const randomIndex = Math.floor(Math.random() * sadKaomojis.length);
    return sadKaomojis[randomIndex];
}

