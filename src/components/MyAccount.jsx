import React from "react";
import { Link } from "react-router-dom";
import "./MyAccount.css";

const MyAccount = () => {

  return (
    <div className="profile-container">
      <h2>My Account</h2>
      <div className="profile-details">
        <div className="avatar-container">
          <img src="https://via.placeholder.com/100" alt="User Avatar" className="avatar" />
        </div>
        <div className="user-info">
          <p><strong>First Name:</strong> John</p>
          <p><strong>Last Name:</strong> Doe</p>
          <p><strong>Username:</strong> johndoe</p>
          <p><strong>Team Members:</strong> Alice, Bob, Charlie</p>
          <p><strong>My Teams:</strong> Development, Design</p>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
