import React from "react";
import githubLogo from './github-logo.png';


function Header() {
    return (
        <header className="header">
            <img src={githubLogo} alt="Github Logo" className="github-logo"/>
            <h1 className="title">My GitHub Portfolio</h1>
        </header>
    );
}


export default Header;