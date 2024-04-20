import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function RepoDetail() {
    const { username, repoName } = useParams();
    const [repoDetails, setRepoDetails] = useState(null);


    useEffect(() => {
        const fetchReposDetails = async () => {
            const response = await axios.get(`https://api.gihthub.com/repos/${username}/${repoName}`, {
                headers: { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` }
            });
            setRepoDetails(response.data);
        };

        fetchReposDetails();
    }, [username, repoName]);

    return (
        <div>
            {repoDetails ? (
                <div className="p-6 bg-white rounded-xl shadow-md">
                    <h2 className="text-xl font-bold">{repoDetails.name}</h2>
                    <p>{repoDetails.description}</p>
                    <a href={repoDetails.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">View on GitHub</a>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}



export default RepoDetail;