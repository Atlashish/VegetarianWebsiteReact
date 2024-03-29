import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        search: '',
        selectedParam: 'query',
        resultsArray: [],
        carouselImages: [],
        apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
        descriptionResults: '',
        descriptionId: '',
        offsets: '',
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },

        setSelectedParam: (state, action) => {
            state.selectedParam = action.payload
        },

        setResultsArray: (state, action) => {
            state.resultsArray = action.payload
        },
        setCarouselImages: (state, action) => {
            state.carouselImages = action.payload
        },
        setDescriptionResults: (state, action) => {
            state.descriptionResults = action.payload
        },
        setDescriptionId: (state, action) => {
            state.descriptionId = action.payload
        },

        clearDescriptionResults: (state) => {
            state.descriptionResults = '';
            state.descriptionId = '';
        },

        setOffset: (state, action) => {
            state.offset = action.payload
        },

    },
});

export const { setSearch, setSelectedParam, setResultsArray, setCarouselImages, setDescriptionResults, setDescriptionId, clearDescriptionResults, setOffset } = appSlice.actions;

export const selectSearch = (state) => state.app.search;
export const selectSelectedParam = (state) => state.app.selectedParam;
export const selectResultsArray = (state) => state.app.resultsArray;
export const selectCarouselImages = (state) => state.app.carouselImages;
export const selectApiKey = (state) => state.app.apiKey;
export const selectDescriptionResults = (state) => state.app.descriptionResults;
export const selectDescriptionId = (state) => state.app.descriptionId;
export const selectOffset = (state) => state.app.offset;



export default appSlice.reducer;