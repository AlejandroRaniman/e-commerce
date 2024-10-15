import React, { useEffect, useState } from 'react';
import { fetchProtectedData } from '../api/apiClient';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchProtectedData('/api/data');
                setData(result);
            } catch (err) {
                setError(err.message);
            }
        };

        getData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Data: {JSON.stringify(data)}</p>
        </div>
    );
};

export default Dashboard;
