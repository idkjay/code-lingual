import React, { useState } from 'react';
import './CodeLingual.scss';
import PieChart from './PieChart';

const CodeLingual = () => {
    const [username, setUsername] = useState("");
    const [languages, setLanguages] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [errormsg, setErrormsg] = useState("");
    const [userfullname, setUserfullname] = useState("");
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);

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