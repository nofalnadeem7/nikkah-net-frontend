import React from "react";
import { useParams } from "react-router-dom";
import { FaBug } from "react-icons/fa6";
import "./Resolve.css"; 

const Resolve = () => {
    const bugs = [
        {
            "id": 1,
            "userid": "60d5f614f35b5c26f8270a18",
            "date": "2024-11-24T12:00:00.000Z",
            "adminid": "60d5f614f35b5c26f8270a19",
            "description": "App crashes when trying to open the settings menu.",
            "status": "open",
            "priority": 2
          },
          {
            "id": 2,
            "userid": "60d5f614f35b5c26f8270a20",
            "date": "2024-11-23T15:00:00.000Z",
            "adminid": null,
            "description": "Unable to upload files to the server, error 500.",
            "status": "resolved",
            "priority": 3
          },
          {
            "id": 3,
            "userid": "60d5f614f35b5c26f8270a21",
            "date": "2024-11-22T10:00:00.000Z",
            "adminid": "60d5f614f35b5c26f8270a22",
            "description": "Feature 'dark mode' does not save preferences after restart.",
            "status": "open",
            "priority": 1
          },
          {
            "id": 4,
            "userid": "60d5f614f35b5c26f8270a23",
            "date": "2024-11-21T08:30:00.000Z",
            "adminid": null,
            "description": "Button misalignment on the homepage when resizing the browser.",
            "status": "resolved",
            "priority": 0
          },
          {
            "id": 5,
            "userid": "60d5f614f35b5c26f8270a24",
            "date": "2024-11-20T18:45:00.000Z",
            "adminid": "60d5f614f35b5c26f8270a25",
            "description": "API is slow to respond, causing delays in real-time data.",
            "status": "open",
            "priority": 3
          }
      ];
      

  const { bugId } = useParams(); 
  const bug = bugs.find((b) => b.id === parseInt(bugId)); 

  
  if (!bug) {
    return (
      <div className="bug-container">
        <h2>Bug Report not found.</h2>
      </div>
    );
  }

  return (
    <div className="bug-container">
      <div className="bug-card">
        <div className="report-header">
          <FaBug className="bug-icon" />
        </div>
        <div className="bug-details">
          <h2 className="bug-title">Report Details</h2>
          <p><strong>Title:</strong> {bug.description}</p>
          <p><strong>Reporter UserID:</strong> {bug.userid}</p>
          <p><strong>Status:</strong> {bug.status}</p>
          <p><strong>Date</strong> {bug.date}</p>
          {/* <p><strong>Reason:</strong> {report.reason}</p>
          <p><strong>Date:</strong> {new Date(report.date).toLocaleString()}</p>
          <p><strong>Status:</strong> {report.status}</p> */}
        </div>
        <div className="profile-actions">
          <button className="btn resolved">Resolved</button>
          <button className="btn pending">Pending</button>
        </div>
      </div>
    </div>
  );
  
};

export default Resolve;
