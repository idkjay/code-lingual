import React, { useState } from 'react';
import '../styles/CodeLingual.css';
import PieChart from './PieChart';

const CodeLingual = () => {
    const [username, setUsername] = useState("");

    return (
        <div className="container">
            <h3>Search a GitHub user's most used programming languages.</h3>
            <p>Based on a user's contributions to public GitHub repositories.</p>
            <input 
                type="text"
                placeholder="Enter User's Github username"
      
            />
        </div>
    )
}

export default CodeLingual;