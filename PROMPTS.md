# AI/Copilot Usage Disclosure
Hi! If you're reading this, chances are you're curious about *how* AI tools were used in the creation of this project. I'll try to keep sections organized based on overall sub-objectives, and use a journal-like style since I'd imagine you'd want to peer into my thought processes :D

Here goes!

## AI Tools Used:
- *GitHub Copilot*: Used primarily for code suggestions and boilerplate generation.
- *Claude*: Used primarily for brainstorming and debugging.
- *ChatGPT*: Used primarily when Claude rate limit is hit (lol), when Claude answers appear suboptimal (feel "off") and I want a "second opinion", or when a task is too "simple" to justify using up my Claude quota (e.g. boilerplate, simple refactors).

## Project Conceptualization
### Prompt: *[Paste Entire Project Requirement]*
- Reasoning: I wanted to get a high-level overview of the project requirements before diving in, and check out what the "average, standardized solution" would be in terms of layout and presentation — just to make sure I'm envisioning more or less the same thing.
- Outcome: Claude generated a simple homepage with a logo and an anime search bar. Very barebones and search was broken (as expected, since i didn't provide any API details), but it gave me a baseline to work against and some code to look through. Mainly it just helped me feel less intimidated about taking on this coding challenge to begin with. (Never done one before, first times are scary!)

## General Busywork
### Prompt: Convert this *[List of Enum Values]* into a TypeScript Type
- Reasoning: Sometimes it's nice to offload busywork to AI, helps me focus on higher-level tasks and cuts down on manual-typing typos
- Outcome: ChatGPT generated the TypeScript code for me, which I then copy-pasted into my codebase.
- Other Examples of Busywork Offloaded to AI:
  - Creating labels for params and putting them into an object for easier mapping in the UI (eg mapping "TV Show" to "tv" for the API call)
  - Find first matching object key based on value

## Managing Typescript Types
### Prompt: *What name to give this TypeScript Type *[Paste Enums]*? 
e.g., the "type" param for "getAnimeSearch" [Enum: "tv" "movie" "ova" "special" "ona" "music" "cm" "pv" "tv_special"]
- Reasoning: I like to suffix my types with "Type" to distinguish them from class names, but I'm not about to name this "AnimeTypeType" lol.
- Outcome: ChatGPT suggested "MediaFormatType", which I then extended to AnimeMediaFormatType (in case we're supporting manga or other media types in the future)

## Going Down Rabbit Holes...
Sometimes when Claude/ChatGPT offer up curious suggestions, I end up probing further into the topic out of curiosity. Sometimes it leads to dead ends, sometimes it leads to cool discoveries. Some neat things I learned/picked up working on this project:
- *Interfaces vs Types*: I used to strongly prefer types over interfaces in TS (they felt more "strict" to me), but after ChatGPT suggested a solution using interfaces, I ended up browsing reddit and StackOverflow threads. The conclusion I got was "it depends on the use case" (fair lol, that and intellisense supports interfaces better in some IDEs for union types). I eventually circled back around with Claude to my initial query: I intended to define a union of string literals for animeMediaFormats, then use that to type out (?) an object to map to label values in the UI, but Claude went "Hey, if you already know all the values beforehand, why not create a const object, THEN derive the types?" Cue `animeMediaFormats.ts`

