import React, { useState } from 'react';
import axios from 'axios';
import { User } from '../types/User';

interface EditProfilePageProps {
  user: User;
  setUser: (user: User) => void;
  goBack: () => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ user, setUser, goBack }) => {
    if (!user || !user._id) {
  return <p>Loading user data...</p>;
}

  console.log("User object:", user);
  console.log("User ID:", user._id);

  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(''); // ⚠️ Only if editing password like this (Not safe in real apps)
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
  try {
    const res = await axios.put(`http://localhost:5000/user/${user._id}`, {
  name,
  email,
  password, // 👉 optional field
});

    if (res.data.success) {
      setUser(res.data.user); // update parent state
      localStorage.setItem('travelPlannerUser', JSON.stringify(res.data.user)); // update local storage
      setMessage("Profile updated successfully!");
    } else {
      setMessage("Update failed.");
    }
  } catch (err) {
    console.error(err);
    setMessage("Server error. Try again.");
  }
};

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Edit Profile</h2>

      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-white"
      />

      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-white"
      />

      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-md dark:bg-gray-700 dark:text-white"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>

      <button
        onClick={goBack}
        className="ml-4 text-gray-600 dark:text-gray-300 underline"
      >
        Cancel
      </button>

      {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
    </div>
  );
};

export default EditProfilePage;
