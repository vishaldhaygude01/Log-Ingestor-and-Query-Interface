import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';

function App() {
    const [logs, setLogs] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        // Fetch logs on component mount
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/logs'); // Adjust the URL as needed
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const searchLogs = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/logs?query=${query}`); // Adjust the URL as needed
            setLogs(response.data);
        } catch (error) {
            console.error('Error searching logs:', error);
        }
    };

    return (
        <div className="container">
            <h1>Log Query Interface</h1>
            <input type="text" placeholder="Search logs" value={query} onChange={handleQueryChange} />
            <button onClick={searchLogs}>Search</button>

            <ul>
                {logs.map((log) => (
                    <li key={log._id}>
                        {log.level} - {log.message} - {log.timestamp}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;