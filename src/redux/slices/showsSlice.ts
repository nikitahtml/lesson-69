import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

interface Show {
    id: number;
    name: string;
}

interface ShowsState {
    shows: Show[];
    selectedShow: Show | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ShowsState = {
    shows: [],
    selectedShow: null,
    status: 'idle',
    error: null,
};

export const fetchShows = createAsyncThunk(
    'shows/fetchShows',
    async (query: string) => {
        const response = await axiosApi.get(`http://api.tvmaze.com/search/shows?q=${query}`);
        return response.data.map((result: any) => result.show);
    }
);

export const fetchShowById = createAsyncThunk(
    'shows/fetchShowById',
    async (id: number) => {
        const response = await axiosApi.get(`http://api.tvmaze.com/shows/${id}`);
        return response.data;
    }
);

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
                state.error = action.error.message || null;
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
                state.error = action.error.message || null;
            });
    },
});

export default showsSlice.reducer;
