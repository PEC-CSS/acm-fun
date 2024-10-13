import "../../styles/pages/activities/DogHttpCode.css"
import { useState } from "react";

export const DogHttpCode = () => {
    const [httpCode, setHttpCode] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (httpCode < 100 || httpCode > 599 || isNaN(httpCode)) {
            setError("Please enter a valid HTTP status code (100-599).");
            setImageUrl("");
        } else {
            setError(""); //Clear any existing error
            setImageUrl(`https://http.dog/${httpCode}.jpg`); //Construct the image url
        }
    };

    return (
        <div className="dog-root">
            <h1>Dog Http Status Code</h1>
            <form onSubmit={handleSubmit} className="dog-form">
                <input type="text" className="dog-input" placeholder="Enter the Http status code (e.g. 404)"
                    value={httpCode} onChange={(e) => setHttpCode(e.target.value)} />
                <button type="submit" className="dog-submit">Fetch Dog Image</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {imageUrl && (
                <div>
                    <img
                        src={imageUrl}
                        alt={`Dog image for HTTP status code ${httpCode}`}
                        style={{ marginTop: "20px", width: "300px", height: "300px" }}
                        className="dog-image" />
                </div>
            )}
        </div>
    )
}