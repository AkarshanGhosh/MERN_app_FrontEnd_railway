// src/components/Profile.js
import React from 'react';

const Profile = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      
      {/* Profile Information */}
      <div>
        <p className="text-lg font-medium">Username: John Doe</p>
        <p className="text-lg">Email: johndoe@example.com</p>
        {/* Add additional profile details here */}
      </div>
    </div>
  );
};

export default Profile;
