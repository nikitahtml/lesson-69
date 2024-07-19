import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchShowById } from '../redux/slices/showsSlice';
import { RootState } from '../redux/store';
import SearchBar from '../components/SearchBar';

const ShowDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    const show = useSelector((state: RootState) => state.shows.selectedShow);
    const status = useSelector((state: RootState) => state.shows.status);
    const error = useSelector((state: RootState) => state.shows.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchShowById(parseInt(id)));
        }
    }, [dispatch, id]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed' || error) {
        return <div>Error loading show details: {error}</div>;
    }

    return (
        <div>
            <SearchBar />
            {show && (
                <div>
                    <h1>{show.name}</h1>
                    <img src={show.image?.medium} alt={show.name} />
                    <p><strong>Genres:</strong> {show.genres.join(', ')}</p>
                    <p><strong>Premiered:</strong> {show.premiered}</p>
                    <p><strong>Summary:</strong> {show.summary}</p>

                </div>
            )}
        </div>
    );
};

export default ShowDetailPage;
