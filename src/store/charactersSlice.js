import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: true,
};

const ENDPOINT = 'https://star-wars-characters.glitch.me/api/search/';

export const fetchCharactersFromAPI = createAsyncThunk(
  'characters/search',
  async (searchTerm) => {
    const response = await fetch(ENDPOINT + searchTerm).then((response) =>
      response.json(),
    );
    console.log(response);
    return response.results;
  },
);

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    add: (state, action) => {
      state.characters = action.payload;
    },
  },
  extraReducers: {
    [fetchCharactersFromAPI.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});
