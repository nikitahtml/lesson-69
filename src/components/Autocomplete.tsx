import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';

interface AutocompleteProps {
    query: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ query }) => {
    const shows = useSelector((state: RootState) => state.shows.shows);

    if (!query) {
        return null;
    }

    return (
        <div style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: 'white', border: '1px solid #ccc' }}>
            {shows.map(show => (
                <Link key={show.id} to={`/shows/${show.id}`} style={{ display: 'block', padding: '10px', textDecoration: 'none', color: 'black' }}>
                    {show.name}
                </Link>
            ))}
        </div>
    );
};

export default Autocomplete;
