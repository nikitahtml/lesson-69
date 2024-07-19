import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './containers/SearchPage';
import ShowDetailPage from './containers/ShowDetailPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/shows/:id" element={<ShowDetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;
