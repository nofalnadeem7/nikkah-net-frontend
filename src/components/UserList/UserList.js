import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token retrieved:", token);

      if (!token) {
        setError("User is not authenticated. Please log in again.");
        return;
      }

      const response = await fetch("http://localhost:5000/admin/all-users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response Status:", response.status);

      const result = await response.json();
      console.log("Response JSON:", result);

      if (!response.ok) {
        if (response.status === 401) {
          setError("Your session has expired. Please log in again.");
          localStorage.removeItem("token");
        } else {
          setError(result?.message || "Failed to fetch user list.");
        }
        return;
      }
      if (!result?.data || !Array.isArray(result.data)) {
        setError("No users found or invalid data format.");
        return;
      }

      setUsers(result.data);
      setError("");
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const capitalizeString = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    if (isNaN(birthDate)) return "Invalid date";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleViewProfile = (userId) => {
    navigate(`/viewprofile/${userId}`);
  };

  return (
    <div className="user-list-container">
      <h1 className="user-list-title"></h1>
      {error && <p className="error-message">{error}</p>}

      <div className="user-card-container">
        {users.length > 0 ? (
          users.map((item, index) => (
            <div className="user-card" key={index}>
              <div className="user-details">
                <p className="user-name">
                  <strong>User:</strong> {capitalizeString(item.name)}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <p>
                  <strong>Age:</strong> {calculateAge(item.dob)}
                </p>
              </div>
              <button className="view-profile-btn" onClick={() => handleViewProfile(item.id)}>
                View Profile
              </button>
            </div>
          ))
        ) : (
          !error && <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
