import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/activities/ActivityCard.css"

export const ActivityCard = ({ activity }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageError(true);
        setImageLoaded(true);
    };

    // Default icon for activities without an image
    const defaultIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTIiIGZpbGw9IiNlMmU4ZjAiLz4KPHN2ZyB4PSIyNCIgeT0iMjQiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2Mzc0OGIiIHN0cm9rZS13aWR0aD0iMiI+CjxwYXRoIGQ9Im0xMiAzLTEuOTEyIDUuODEzYTIgMiAwIDAgMS0xLjI3NSAxLjI3NUwzIDEybDUuODEzIDEuOTEyYTIgMiAwIDAgMSAxLjI3NSAxLjI3NUwxMiAyMWwxLjkxMi01LjgxM2EyIDIgMCAwIDEgMS4yNzUtMS4yNzVMMjEgMTJsLTUuODEzLTEuOTEyYTIgMiAwIDAgMS0xLjI3NS0xLjI3NUwxMiAzeiIvPgo8L3N2Zz4KPC9zdmc+";

    return (
        <Link 
            className="activity-card-root" 
            to={`/activities/${activity.urlTerm}`}
            role="button"
            tabIndex={0}
            aria-label={`Navigate to ${activity.title} activity: ${activity.description}`}
        >
            <div className="activity-card-image-container">
                {!imageLoaded && !imageError && (
                    <div className="image-placeholder">
                        <div className="loading-spinner"></div>
                    </div>
                )}
                <img 
                    src={imageError ? defaultIcon : activity.icon} 
                    alt={`${activity.title} icon`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ 
                        opacity: imageLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                    }}
                />
            </div>
            <h2 className="activity-card-title">{activity.title}</h2>
            <p className="activity-card-desc">{activity.description}</p>
        </Link>
    )
}
