import React from "react";
import myPhoto from './vibbi.jpg';

function Profile() {
    return (
        <div className="profile">
            <img src={myPhoto} alt="My Photo" className="my-photo"/>
            <p className="statement">
                Hello, My name is  Simeon Nyakeh Vibbi. I'm a frontend developer with a passion for creating elegant and efficient Web Applications. Welcome to my Github portfolio where you can explore my projects and conributions.
            </p>
        </div>
    );
}


export default Profile;