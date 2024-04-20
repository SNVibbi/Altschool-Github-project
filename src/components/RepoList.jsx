import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const api = axios.create({
    headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
    }
});

function RepoList({ setModalOpen, setRepoDetails, handleDeleteRepo }) {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchRepos = async () => {
            const response =await axios.get('https://api.github.com/users/SNVibbi/repos', {
              headers: { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` }  
            });
            setRepos(response.data);
        };

        fetchRepos();
    }, []);

    return (
        <ul className="space-y-4">
            {repos.map(repo => (
                <li key={repo.id} className="p-6 bg-white rounded-xl shadow-md">
                    <Link to={`/repos/${repo.owner.login}/${repo.name}`} className="text-lg font-bold text-blue-500 hover:text-blue-700">
                        {repo.name}
                    </Link>
                    <p>{repo.description || 'No description provided.'}</p>
                    <button onClick={() => { setRepoDetails(repo); setModalOpen(true); }} className="mr-2 p-1 bg-green-500 text-white rounded hover:bg-green-700">Edit</button>
                    <button onClick={() => handleDeleteRepo(repo.id)} key={repo.id} className="p-1 bg-red-500 text-white rounded hover:bg-red-700">Delete Repo</button>
                </li>
            ))}
        </ul>
    );
}



export default RepoList;