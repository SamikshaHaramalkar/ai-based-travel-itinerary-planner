import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${await res.text()}`);
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load users.");
        setLoading(false);
      });
  }, []);

  // 🗑️ Delete User Function
const handleDelete = async (id: string) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${await res.text()}`);
    }

    // ✅ Delete successful — remove from state
    setUsers(users.filter((u) => u._id !== id));
    alert("User deleted successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to delete user.");
  }
};


  if (loading) {
    return <div className="p-4">Loading users...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Users (Admin)</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
  <thead>
    <tr>
      <th className="border px-4 py-2">Name</th>
      <th className="border px-4 py-2">Email</th>
      <th className="border px-4 py-2">Role</th>
      <th className="border px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((u) => (
      <tr key={u._id}>
        <td className="border px-4 py-2">{u.name}</td>
        <td className="border px-4 py-2">{u.email}</td>
        <td className="border px-4 py-2 capitalize">{u.role}</td>
        <td className="border px-4 py-2">
          <button
            onClick={() => handleDelete(u._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      )}
    </div>
  );
};

export default AdminUsersPage;
