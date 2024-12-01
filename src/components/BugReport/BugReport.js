import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BugReport.css";


const BugReport = () => {
    const [bugs, setBugs] = useState([]);
    const [error, setError] = useState("");
    const navigate=useNavigate();

    useEffect(() => {
        console.log(1);
        getBugs();
    }, []);

    const getBugs = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("Token retrieved:", token);

            if (!token) {
                setError("User is not authenticated. Please log in again.");
                return;
            }

            const response = await fetch("http://localhost:5000/admin/all-bug-reports", {
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
                    setError(result?.message || "Failed to fetch bug report list.");
                }
                return;
            }
            if (!result?.data || !Array.isArray(result.data)) {
                setError("No bug reports found or invalid data format.");
                return;
            }
            console.log("Bug data received:", result.data);
            setBugs(result.data);
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

    const handleBugReport = (bugId) => {
        navigate(`/viewbug/${bugId}`);
    };


    return (
        <div className="bug-report-container">
            <h1 className="bug-report-title"></h1>
            <div className="bug-report-card-container">
                {bugs.map((item, index) => (
                    <div className="bug-report-card" key={index}>
                        <div className="bug-report-details">
                            <p className="user-name">
                                <strong>Title:</strong> {JSON.stringify(item.description)}
                            </p>
                            <p>
                                <strong>User-ID:</strong> {JSON.stringify(item.id)}
                            </p>
                            <p>
                                <strong>Status</strong> {JSON.stringify(item.status)}
                            </p>
                            <p>
                                <strong>Date:</strong> {new Date(item.date).toLocaleString()}
                            </p>
                        </div>

                        <button className="resolve-btn" onClick={() => handleBugReport(item.id)}>
                            Resolve</button>

                    </div>
                ))}
            </div>
        </div>

    );
};

export default BugReport;