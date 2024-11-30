import React from "react";
import { useParams } from "react-router-dom";
import { BsPersonFillExclamation } from "react-icons/bs";
import "./ViewReport.css"; 

const ViewReport = () => {
    const reports = [
        {
          id: 1,
          reporter: {
            _id: "64ca1b23e72f5a3f3a2d1e8c",
            name: "Alice Johnson",
            email: "alice@example.com"
          },
          reported: {
            _id: "64ca1b23e72f5a3f3a2d1e8d",
            name: "Bob Smith",
            email: "bob@example.com"
          },
          reason: "Inappropriate language in a chat.",
          date: "2024-11-23T14:32:00Z",
          status: "pending"
        },
        {
          id: 2,
          reporter: {
            _id: "64ca1b23e72f5a3f3a2d1e8e",
            name: "Charlie Brown",
            email: "charlie@example.com"
          },
          reported: {
            _id: "64ca1b23e72f5a3f3a2d1e8f",
            name: "Diana Prince",
            email: "diana@example.com"
          },
          reason: "Spamming multiple users.",
          date: "2024-11-22T09:15:00Z",
          status: "resolved"
        },
        {
          id: 3,
          reporter: {
            _id: "64ca1b23e72f5a3f3a2d1e90",
            name: "Eve Black",
            email: "eve@example.com"
          },
          reported: {
            _id: "64ca1b23e72f5a3f3a2d1e91",
            name: "Frank Green",
            email: "frank@example.com"
          },
          reason: "Sharing offensive content.",
          date: "2024-11-24T10:50:00Z",
          status: "pending"
        },
        {
          id: 4,
          reporter: {
            _id: "64ca1b23e72f5a3f3a2d1e92",
            name: "Grace Hopper",
            email: "grace@example.com"
          },
          reported: {
            _id: "64ca1b23e72f5a3f3a2d1e93",
            name: "Hank Adams",
            email: "hank@example.com"
          },
          reason: "Impersonating another user.",
          date: "2024-11-21T18:05:00Z",
          status: "resolved"
        },
        {
          id: 5,
          reporter: {
            _id: "64ca1b23e72f5a3f3a2d1e94",
            name: "Ivy Walker",
            email: "ivy@example.com"
          },
          reported: {
            _id: "64ca1b23e72f5a3f3a2d1e95",
            name: "Jack Hill",
            email: "jack@example.com"
          },
          reason: "Harassment in direct messages.",
          date: "2024-11-20T22:45:00Z",
          status: "pending"
        }
      ];
      

  const { reportId } = useParams(); 
  const report = reports.find((r) => r.id === parseInt(reportId)); 

  
  if (!report) {
    return (
      <div className="profile-container">
        <h2>Report not found.</h2>
      </div>
    );
  }

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
          <button className="btn ban-user">Ban User</button>
          <button className="btn discard">Discard</button>
        </div>
      </div>
    </div>
  );
  
};

export default ViewReport;
