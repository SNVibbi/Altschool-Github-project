import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Profile from './components/Profile';
import './App.css';
import RepoDetailsComponent from './components/RepoDetail.jsx';
import RepoList from './components/RepoList.jsx';
import NotFound from './components/NotFoundPage.jsx';
import RepoModal from './components/RepoModal.jsx';
import axios from 'axios';



const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: { 
    Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
  }
});

// console.log("GitHub Token:", import.meta.env.VITE_GITHUB_TOKEN);

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [repoDetails, setRepoDetails] = useState(null);

  const handleCreateOrUpdateRepo = async (repoData) => {
    const method = repoDetails ? 'patch' : 'post';
    const url = repoDetails ? `/repos/SNVibbi/${repoDetails.name}` : '/user/repos';

    try {
      const response = await api[method](url, {
        name: repoData.name,
        description: repoData.description,
      });
      console.log('Success:', response.data)
      setModalOpen(false);
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

const handleDeleteRepo = async (repoName) => {
  try {
    const response = await axios.delete(`https://api.github.com/repos/SNVibbi/${repoName}`, {
      headers: { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` }
    });
    console.log('Deleted successfully', response.data);
  } catch (error) {
    console.error('Error URL:', `https://api.github.com/repos/SNVibbi/${repoName}`);
    console.error('Error response:', error.response);
  }
};

return (
  <Router>
    <div className="container mx-auto my-10">
      <Header />
      <Profile />
      <h1 className="text-3xl font-bold text-center mb-6">GitHub Repositories App</h1>
      <button onClick={() => { setRepoDetails(null); setModalOpen(true);}} className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Create New Repo</button>
      {modalOpen && 
      <RepoModal 
      isOpen={modalOpen} 
      onClose={() => setModalOpen(false)} 
      onSubmit={handleCreateOrUpdateRepo} />}
      <Routes>
        <Route path="/" element={<RepoList setRepoDetails={setRepoDetails} handleDeleteRepo={handleDeleteRepo} />} />
        <Route path="/repo/:name" element={<RepoDetailsComponent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <RepoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleCreateOrUpdateRepo} initialData={repoDetails || {}} />
    </div>
  </Router>
);

}


export default App;