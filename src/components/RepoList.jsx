import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const api = axios.create({
    baseURL: 'https:/api.github.com',
    headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
    }
});

function RepoList({ setModalOpen, setRepoDetails, handleDeleteRepo }) {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await api.get('/users/SNVibbi/repos');
                setRepos(response.data);
                if (Array.isArray(response.data)) {
                    setRepos(response.data); // Set the repos if the response is an array
                } else {
                    console.error("Expected an array but got:", response.data);
                    setRepos([]); // Fallback to an empty array if not
                }
            } catch (error) {
                console.error('Failed to fetch repositories:', error);
                setRepos([])
            }
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
                    <button onClick={() => handleDeleteRepo(repo.id)} className="p-1 bg-red-500 text-white rounded hover:bg-red-700">Delete Repo</button>
                </li>
            ))}
        </ul>
    );
}



export default RepoList;