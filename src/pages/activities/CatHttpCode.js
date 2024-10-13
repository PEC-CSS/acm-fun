import "../../styles/pages/activities/CatHttpCode.css"
import { useState } from "react";

export const CatHttpCode = () => {
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
            setImageUrl(`https://http.cat/${httpCode}.jpg`); //Construct the image url
        }
    };

    return (
        <div className="cat-root">
            <h1>Cat Http Status Code</h1>
            <form onSubmit={handleSubmit} className="cat-form">
                <input type="text" className="cat-input" placeholder="Enter the Http status code (e.g. 404)"
                    value={httpCode} onChange={(e) => setHttpCode(e.target.value)} />
                <button type="submit" className="cat-submit">Fetch Cat Image</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {imageUrl && (
                <div>
                    <img
                        src={imageUrl}
                        alt={`Cat image for HTTP status code ${httpCode}`}
                        style={{ marginTop: "20px", width: "300px", height: "300px" }}
                        className="cat-image" />
                </div>
            )}
        </div>
    )
}