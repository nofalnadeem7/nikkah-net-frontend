import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserReport.css";


const UserReport = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(1);
    getReports();
  }, []);

  const getReports = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token retrieved:", token);

      if (!token) {
        setError("User is not authenticated. Please log in again.");
        return;
      }

      const response = await fetch("http://localhost:5000/admin/all-user-reports", {
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
          setError(result?.message || "Failed to fetch user report list.");
        }
        return;
      }
      if (!result?.data || !Array.isArray(result.data)) {
        setError("No user reports found or invalid data format.");
        return;
      }

      setReports(result.data);
      setError("");
    } catch (error) {
      console.error("Error fetching user reports:", error);
      setError("An error occurred. Please try again later.");
    }
  };


  const capitalizeString = (string) => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string;
  };

  const handleViewReport = (reportId) => {
    navigate(`/viewreport/${reportId}`);
  };


  return (
    <div className="user-report-container">
      <h1 className="user-report-title"></h1>
      <div className="report-card-container">
        {reports.map((item, index) => (
          <div className="report-card" key={index}>
            <div className="report-details">
              <p className="user-name">
                <strong>Type:</strong> {item.reason}
              </p>
              <p>
                <strong>User:</strong> {item.reporter.firstname}
              </p>
              <p>
                <strong>Email:</strong> {item.reporter.email}
              </p>
              <p>
                <strong>User Reported:</strong> {item.reported.firstname}
              </p>
            </div>
            <button className="view-report-btn" onClick={() => handleViewReport(item.id)}>
              View Report</button>
          </div>
        ))}
      </div>
    </div>

  );
};

export default UserReport;