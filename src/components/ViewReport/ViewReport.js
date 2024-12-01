import React,{ useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { BsPersonFillExclamation } from "react-icons/bs";
import "./ViewReport.css"; 

const ViewReport = () => {
  const { reportId } = useParams();
  const [report, setReports] = useState(null);
  const [error, setError] = useState("");
  const  navigate=useNavigate();

  useEffect(() => {
    getUserReport(reportId);
  }, [reportId]);

  const getUserReport = async (reportId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated. Please log in again.");
        return;
      }

      const response = await fetch("http://localhost:5000/admin/user-report-info/" + reportId, {
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
          setError(result?.message || "Failed to fetch user report details.");
        }
        return;
      }

      setReports(result.data);
      setError("");
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("An error occurred. Please try again later.");
    }
  };
    

  
  if (!report) {
    return (
      <div className="profile-container">
        <h2>Report not found.</h2>
      </div>
    );
  }

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated. Please log in again.");
        return;
      }
      const resp2=await fetch("http://localhost:5000/admin/resolve-user-report",
         {
           method:"POST",
           headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            
          },
          body: JSON.stringify({ userid: report.reported._id}),

         }
      );

      if (!resp2.ok) {
        setError(result?.message || "Failed to change the status.");
        return;
      }
  
      const response = await fetch("http://localhost:5000/admin/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          
        },
        body: JSON.stringify({ id: report.reported.id }),
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

      const resp=await fetch("http://localhost:5000/admin/update-user-rep",
         {
           method:"POST",
           headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            
          },
          body: JSON.stringify({ id: report.id, status:"resolved" }),

         }
      );

      if (!resp.ok) {
        setError(result?.message || "Failed to change the status.");
        return;
      }

      
  
      setError("");
      alert("User banned successfully.");
      window.location.href = "/userreport"; 
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("An error occurred. Please try again later.");
    }
  };
  

  const ignore = async()=>{

    const token = localStorage.getItem("token");
    const resp=await fetch("http://localhost:5000/admin/update-user-rep",
         {
           method:"POST",
           headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            
          },
          body: JSON.stringify({ id: report.id, status:"resolved" }),

         }
      );
      let result= await resp.json();
      if (!resp.ok) {
        setError(result?.message || "Failed to change the status.");
        return;
      }
    navigate('/userreport')
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <BsPersonFillExclamation className="report-icon" />
        </div>
        <div className="profile-details">
          <h2 className="report-title">Report Details</h2>
          <p><strong>Reporter Name:</strong> {report.reporter.name}</p>
          <p><strong>Reporter Email:</strong> {report.reporter.email}</p>
          <p><strong>Reported User Name:</strong> {report.reported.name}</p>
          <p><strong>Reported User Email:</strong> {report.reported.email}</p>
          <p><strong>Reason:</strong> {report.reason}</p>
          <p><strong>Date:</strong> {new Date(report.date).toLocaleString()}</p>
          <p><strong>Status:</strong> {report.status}</p>
        </div>
        <div className="profile-actions">
          <button className="btn ban-user" onClick={deleteUser}
            disabled={report?.discarded} > Ban User</button>
          <button className="btn discard" onClick={ignore}>Discard</button>
        </div>
      </div>
    </div>
  );
  
};

export default ViewReport;
