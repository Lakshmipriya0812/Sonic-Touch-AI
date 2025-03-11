import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState("");
  const [newValue, setNewValue] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleEditClick = (field) => {
    setFieldToEdit(field);
    if (field === "password") {
      setCurrentPassword("");
      setNewPassword("");
      setShowPassword(false);
    } else {
      setNewValue(user[field] || "");
    }
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      let payload = {};

      if (fieldToEdit === "password") {
        if (!currentPassword || !newPassword) {
          setError("Please provide both your current and new password.");
          return;
        }
        payload = { currentPassword, newPassword };
      } else {
        payload = { [fieldToEdit]: newValue };
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(response.data.user);
      setShowModal(false);
      setError("");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again later."
      );
    }
  };

  if (loading) return <div>Loading your profile...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Personal Information</h1>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm">Full Name</p>
          <p className="text-lg font-semibold">{user.name}</p>
        </div>
        <button
          onClick={() => handleEditClick("name")}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm">Email Address</p>
          <p className="text-lg font-semibold">{user.email}</p>
        </div>
        <button
          onClick={() => handleEditClick("email")}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-gray-600 text-sm">Password</p>
          <p className="text-lg font-semibold">••••••••</p>
        </div>
        <button
          onClick={() => handleEditClick("password")}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
            <h2 className="text-xl font-bold mb-4">
              Edit {fieldToEdit === "password" ? "Password" : fieldToEdit}
            </h2>

            {fieldToEdit === "password" ? (
              <>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full p-2 border rounded"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm text-blue-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full p-2 border rounded"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm text-blue-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </>
            ) : (
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            )}

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
