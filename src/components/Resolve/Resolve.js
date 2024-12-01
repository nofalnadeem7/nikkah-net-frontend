import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBug } from "react-icons/fa6";
import "./Resolve.css";

const Resolve = () => {
  const { bugId } = useParams();
  const [bug, setBugs] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getBugReport(bugId);
  }, [bugId]);

  const getBugReport = async (bugId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated. Please log in again.");
        return;
      }

      const response = await fetch("http://localhost:5000/admin/bug-report-info/" + bugId, {
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
          setError(result?.message || "Failed to fetch bug report details.");
        }
        return;
      }

      setBugs(result.data);
      setError("");
    } catch (error) {
      console.error("Error fetching bug report:", error);
      setError("An error occurred. Please try again later.");
    }
  };


  if (!bug) {
    return (
      <div className="bug-container">
        <h2>Bug Report not found.</h2>
      </div>
    );
  }
  const ResolvedReport = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated. Please log in again.");
        return;
      }

      const response = await fetch("http://localhost:5000/admin/update-bug-rep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({ id: bugId }),
      });

      let result;
      try {
        result = await response.json();
      } catch (error) {
        console.error("Invalid JSON response:", error);
        setError("Server error: Invalid response format.");
        return;
      }

      console.log("Resolved Bug:", result);

      if (!response.ok) {
        setError(result?.message || "Failed to resolve the bug.");
        return;
      }

      setError("");
      alert("Bug resolved successfully.");
      window.location.href = "/bugreport";
    } catch (error) {
      console.error("Error resolving bug:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bug-container">
      <div className="bug-card">
        <div className="report-header">
          <FaBug className="bug-icon" />
        </div>
        <div className="bug-details">
          <h2 className="bug-title">Report Details</h2>
          <p><strong>Title:</strong> {bug.description}</p>
          <p><strong>Reporter UserID:</strong> {bug.userid.email}</p>
          <p><strong>Status:</strong> {bug.status}</p>
          <p><strong>Date</strong> {bug.date}</p>
          {/* <p><strong>Reason:</strong> {report.reason}</p>
          <p><strong>Date:</strong> {new Date(report.date).toLocaleString()}</p>
          <p><strong>Status:</strong> {report.status}</p> */}
        </div>
        <div className="profile-actions">
          <button className="btn resolved" onClick={ResolvedReport}
            disabled={bug?.resolved}
          >
          {bug?.resolved ? "Resolved" : "Resolve"}</button>
          <button className="btn pending">Pending</button>
        </div>
      </div>
    </div>
  );

};

export default Resolve;
