import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BugReport.css";


const BugReport = () => {
    const [bugs, setBugs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log(1);
        getBugs();
    }, []);

    const getBugs = async () => {
        try {
            let result = await fetch("/Bug.json");
            result = await result.json();

            const formattedBugs = result.map((bug) => ({
                ...bug,
                name: `${capitalizeString(bug.firstname)} ${bug.middlename ? capitalizeString(bug.middlename) : ""} ${capitalizeString(bug.lastname)} `,
                // age: calculateAge(new Date(user.dob)),
            }));

            setBugs(formattedBugs);
            console.log(formattedBugs);
        } catch (err) {
            setError("Failed to fetch users.");
        }
    };


    const capitalizeString = (string) => {
        if (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return string;
    };


    return (
        <div className="bug-report-container">
            <h1 className="bug-report-title"></h1>
            <div className="bug-report-card-container">
                {bugs.map((item, index) => (
                    <div className="bug-report-card" key={index}>
                        <div className="bug-report-details">
                            <p className="user-name">
                                <strong>Title:</strong> {item.description}
                            </p>
                            <p>
                                <strong>User-Id:</strong> {item.userid}
                            </p>
                            <p>
                                <strong>Status</strong> {item.status}
                            </p>
                            <p>
                                <strong>Date:</strong> {item.date}
                            </p>
                        </div>
                        <Link to={`/viewbug/${item.id}`}>
                            <button className="resolve-btn">Resolve</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default BugReport;