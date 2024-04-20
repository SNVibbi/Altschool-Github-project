import React, { useState } from "react";

function RepoModal({ isOpen, onClose, onSubmit, initialData = {} })  {
    const [repoData, setRepoData] = useState({
        name: initialData.name || '',
        description: initialData.description || '',
    });

    const handleChange = (e) => {
        setRepoData({ ...repoData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(repoData);
       if (typeof onClose === 'function') {
        onClose();
       } else {
        console.error('onClose is not a function', onClose)
       }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
               <h3 className="text-lg text-center font-bold">{initialData.name ? 'Update Repository' : 'Create Repository'}</h3>
               <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="name"
                    placeholder="Repository Name"
                    value={repoData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={repoData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-4"
                    required
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
                    Submit
                </button>
                <button onClick={onClose} type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4">
                    Cancel
                </button>
               </form> 
            </div>
        </div>
    );

}


export default RepoModal;