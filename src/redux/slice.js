import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        search: '',
        resultsArray: [],
        carouselImages: [],
        apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
        descriptionResults: '',
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
        setResultsArray: (state, action) => {
            state.resultsArray = action.payload
        },
        setCarouselImages: (state, action) => {
            state.carouselImages = action.payload
        },
        setDescriptionResults: (state, action) => {
            state.descriptionResults = action.payload
        }
    },
});

export const { setSearch, setResultsArray, setCarouselImages, setDescriptionResults } = appSlice.actions;

export const selectSearch = (state) => state.app.search;
export const selectResultsArray = (state) => state.app.resultsArray;
export const selectCarouselImages = (state) => state.app.carouselImages;
export const selectApiKey = (state) => state.app.apiKey;
export const selectDescriptionResults = (state) => state.app.descriptionResults;


export default appSlice.reducer;