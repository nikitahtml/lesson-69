import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchShows } from '../redux/slices/showsSlice';
import Autocomplete from './Autocomplete';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        dispatch(fetchShows(e.target.value));
    };

    return (
        <div style={{ position: 'relative' }}>
            <input type="text" value={query} onChange={handleChange} placeholder="Search for TV shows" />
            <Autocomplete query={query} />
        </div>
    );
};

export default SearchBar;
