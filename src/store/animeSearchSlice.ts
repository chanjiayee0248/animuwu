import { createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {AnimeMediaFormatParamType} from "@/features/animeSearch/animeMediaFormats";
import type {AnimeAiringStatusParamType} from "@/features/animeSearch/animeAiringStatus";
import type {AnimeAudienceRatingParamType} from "@/features/animeSearch/animeAudienceRating";
import type {AnimeSortCategoryParamType} from "@/features/animeSearch/animeSortCategory";
import type {AnimeSortDirectionParamType} from "@/features/animeSearch/animeSortDirection";

// Think of the Redux store as a **shared kitchen ledger**: it keeps track of everything in the pantry.

// -------------------------
// State shape + Initial State
// -------------------------
// This defines the "observable" state in Redux terms.
// In MobX, this would be equivalent to:
//   class SearchParamsStore {
//     searchQuery = "";
//     airingStatus = null;
//     ...
//     constructor() { makeAutoObservable(this) }
//   }
interface AnimeSearchState {
    searchQuery: string;
    airingStatus: AnimeAiringStatusParamType;
    audienceRating: AnimeAudienceRatingParamType;
    mediaFormat: AnimeMediaFormatParamType;
    sortCategory: AnimeSortCategoryParamType;
    sortDirection: AnimeSortDirectionParamType;
    currentPage: number;
    animeSearchIsLoading: boolean;
    animeSearchError: string | null;  // null = no error, string = error message
}

const initialState: AnimeSearchState = {
    searchQuery: '',
    airingStatus: null,
    audienceRating: null,
    mediaFormat: null,
    sortCategory: 'score',
    sortDirection: 'desc',
    currentPage: 1,
    animeSearchIsLoading: false,
    animeSearchError: null,
};
// -------------------------
// Redux slice
// Each slice represents a dedicated fridge or shelf in the kitchen that holds a certain category of ingredients.
// Each reducer is like a recipe card: it tells the kitchen how to update the pantry when an order comes in.
// -------------------------
// This is like a MobX store with actions + observable state.
// In MobX, each "reducer" would be a method modifying observable properties.
const animeSearchSlice = createSlice({
    name: 'animeSearch',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setAiringStatus: (state, action: PayloadAction<AnimeAiringStatusParamType>) => {
            state.airingStatus = action.payload;
        },
        setAudienceRating: (state, action: PayloadAction<AnimeAudienceRatingParamType>) => {
            state.audienceRating = action.payload;
        },
        setMediaFormat: (state, action: PayloadAction<AnimeMediaFormatParamType>) => {
            state.mediaFormat = action.payload;
        },
        setSortCategory: (state, action: PayloadAction<AnimeSortCategoryParamType>) => {
            state.sortCategory = action.payload;
        },
        setSortDirection: (state, action: PayloadAction<AnimeSortDirectionParamType>) => {
            state.sortDirection = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.animeSearchIsLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.animeSearchError = action.payload; // null = no error, string = error message
        },
        resetFilters: (state) => {
            Object.assign(state, initialState);
        },
    },
});

// -------------------------
// Export actions
// Must create an order form (slice.actions) and hand to kitchen (dispatch)
// Ledger of every action (Redux) vs scribbling/erasing on fridge whiteboard(?) directly (MobX)
// -------------------------
// These are like MobX "actions" — you call them to modify state
// Actions are automatically generated with createSlice based on the reducers defined above
export const animeSearchActions = animeSearchSlice.actions;
export default animeSearchSlice.reducer;

// -------------------------
// Export reducer
// -------------------------
// This reducer gets added to the Redux store


// HOW REDUX WORKS (for reference)
//              Component (Chef)
//                  │
//                  │ calls action creator
//                  ▼
//          Action Object (Order Form)
//                  │
//                  ▼ dispatch(action)
//   ┌─────────────────────────────┐
//   │      Head Chef (Redux)      │
//   │  Knows all fridges (slices) │
//   │                             │
//   │  Looks up reducer for action│
//   └──────────────┬──────────────┘
//                  │
//                  ▼
// Find Fridge / Slice (animeSearchSlice)
//                  │
//                  ▼
// Cook / Run Reducer (recipe)
//                  │
//                  ▼
// Update Pantry (state)
//                  │
//                  ▼
// Notify Subscribers / Devtools
