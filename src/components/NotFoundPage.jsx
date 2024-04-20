import React from "react";
import { Link } from "react-router-dom";


function NotFoundPage() {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold my-2">404 - Page Not Found</h1>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <Link to="/" className="text-blue-500 hover:text-blue-700">Go to Home</Link>
        </div>
    );
}


export default NotFoundPage;