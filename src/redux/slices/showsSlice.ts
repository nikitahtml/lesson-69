import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Show {
    id: number;
    name: string;
    image?: { medium: string };
    genres: string[];
    premiered: string;
    summary: string;
}

interface ShowsState {
    shows: Show[];
    selectedShow?: Show;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}

const initialState: ShowsState = {
    shows: [],
    selectedShow: undefined,
    status: 'idle',
    error: undefined,
};


export const fetchShows = createAsyncThunk('shows/fetchShows', async (query: string) => {
    const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
    return response.data.map((show: any) => show.show);
});

export const fetchShowById = createAsyncThunk('shows/fetchShowById', async (id: number) => {
    const response = await axios.get(`http://api.tvmaze.com/shows/${id}`);
    return response.data;
});

const showsSlice = createSlice({
    name: 'shows',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShows.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchShows.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.shows = action.payload;
            })
            .addCase(fetchShows.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchShowById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchShowById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedShow = action.payload;
            })
            .addCase(fetchShowById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default showsSlice.reducer;
