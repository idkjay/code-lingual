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

    const myHeaders = new Headers();
    const authHeader = "Basic " + btoa(process.env.REACT_APP_GITHUB_CLIENT_ID + ":" + process.env.REACT_APP_GITHUB_CLIENT_SECRET);
    myHeaders.append("Authorization", authHeader);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const handleChange = (event) => {
        setUsername(event.target.value);
    }

    const fetchUser = async () => {
        setFetching(true);
        const resp = await fetch(`https://api.github.com/users/${username}`, requestOptions);
        const user = await resp.json();
        if(user) { 
            setUserfullname(user.name);
            setFollowers(user.followers);
            setFollowing(user.following);
        } else {
            setErrormsg("Not a valid user");
        }

        fetchUserdetails();
        setFetching(false);
    }

    const fetchUserdetails = async () => {
        setFetching(true);
        const resp = await fetch(`https://api.github.com/users/${username}/repos`, requestOptions);
        const userRepositories = await resp.json();
        if(userRepositories && userRepositories.length > 0) {
            const languageMap = new Map();
            userRepositories.forEach((repo) => {
                if(repo.language) {
                    if(languageMap.has(repo.language)) {
                        languageMap.set(repo.language, languageMap.get(repo.language)+1);
                    } else {
                        languageMap.set(repo.language, 1);
                    }
                }
            });
            setLanguages([]);
            const l = [];
            l.push(["Languages", "Count"]);
            languageMap.forEach((value, key) => {
                l.push([key, value]);
                
            });
            setLanguages(languages => l);
        } else {
            setErrormsg("Not a valid user");
        }
        setFetching(false);
    }

    return (
      <div className="container">
        <h3>Search a GitHub user's most used programming languages.</h3>
        <p>Based on a user's contributions to public GitHub repositories.</p>
        <input
          type="text"
          placeholder="Enter User's Github username"
          value={username}
          onChange={handleChange}
        />
        <button
            variant="contained"
            color="primary"
            onClick={fetchUser}
        >
            Fetch
        </button>
        <div>{errormsg}</div>
        <div>
          {languages.length > 0 && !fetching && (
            <div>
              <div>
                {userfullname && (
                  <span>
                    <br />
                    {userfullname}
                  </span>
                )}
                {followers && <p>Followers: {followers}</p>}
                {following && <p>Following {following}</p>}
              </div>
              <PieChart languages={languages} userfullname={userfullname} />
            </div>
          )}
        </div>
      </div>
    );
}

export default CodeLingual;