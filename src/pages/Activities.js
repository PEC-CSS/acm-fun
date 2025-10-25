import React, { useState, useEffect } from "react";
import "../styles/pages/Activities.css"
import {activities} from "../data/content";
import {ActivityCard} from "../components/activities/ActivityCard";

export const Activities = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for smooth transition
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="activities-root">
            <h1 className="activities-title">Activities</h1>
            <div className="activities-content">
                {isLoading ? (
                    // Loading skeleton
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="activity-card-root loading">
                            <div style={{
                                width: '80px',
                                height: '80px',
                                backgroundColor: '#e2e8f0',
                                borderRadius: '12px',
                                marginBottom: '20px'
                            }}></div>
                            <div style={{
                                width: '80%',
                                height: '20px',
                                backgroundColor: '#e2e8f0',
                                borderRadius: '4px',
                                marginBottom: '12px'
                            }}></div>
                            <div style={{
                                width: '100%',
                                height: '40px',
                                backgroundColor: '#e2e8f0',
                                borderRadius: '4px'
                            }}></div>
                        </div>
                    ))
                ) : (
                    activities.map((activity, index) => (
                        <ActivityCard 
                            key={activity.urlTerm || index} 
                            activity={activity} 
                        />
                    ))
                )}
            </div>
        </div>
    )
}
