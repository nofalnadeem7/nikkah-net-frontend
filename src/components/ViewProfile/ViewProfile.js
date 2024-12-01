import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./ViewProfile.css";
import moment from "moment";

const ViewProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getUserProfile(userId);
  }, [userId]);

  const getUserProfile = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated. Please log in again.");
        return;
      }

      const response = await fetch("http://localhost:5000/admin/user-info/" + userId, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setError("Your session has expired. Please log in again.");
          localStorage.removeItem("token");
        } else {
          setError(result?.message || "Failed to fetch user details.");
        }
        return;
      }

      setUser(result.data);
      setError("");
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <h2>{error || "User not found."}</h2>
      </div>
    );
  }

  const verifyUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated. Please log in again.");
        return;
      }

      const response = await fetch("http://localhost:5000/admin/verify-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId }),
      });

      const result = await response.json();

      console.log("Verify User Response:", result);

      if (!response.ok) {
        setError(result?.message || "Failed to verify the user.");
        return;
      }

      setUser((prevUser) => ({ ...prevUser, verified: true }));
      setError("");
    } catch (error) {
      console.error("Error verifying user:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        setError("User is not authenticated. Please log in again.");
        return;
      }
  
      const response = await fetch("http://localhost:5000/admin/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          
        },
        body: JSON.stringify({ id: userId }),
      });
  
      let result;
      try {
        result = await response.json();
      } catch (error) {
        console.error("Invalid JSON response:", error);
        setError("Server error: Invalid response format.");
        return;
      }
  
      console.log("Delete User Response:", result);
  
      if (!response.ok) {
        setError(result?.message || "Failed to delete the user.");
        return;
      }
  
      setError("");
      alert("User deleted successfully.");
      window.location.href = "/userlist"; 
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <FaUserCircle className="user-icon" />
        </div>
        <div className="profile-details">
          <h2 className="user-name">{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>DOB:</strong> {moment(user.dob).format("DD MMM YYYY")}</p>
        </div>
        <div className="profile-actions">
          <button
            className="btn verified"
            onClick={verifyUser}
            disabled={user?.verified}
          >
            {user?.verified ? "Verified" : "Verify"}
          </button>
          <button
            className="btn not-verified"
            onClick={deleteUser}
            disabled={user?.verified} 
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;


