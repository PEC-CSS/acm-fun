import {useEffect, useState} from "react";
import axios from "axios";
import "../../styles/pages/activities/RandomQuote.css"

export const RandomQuote = () => {

    const [quote, setQuote] = useState()

    const generateQuote = () => {
        axios({
            method: "GET",
            url: "https://api.quotable.io/random"
        }).then(res => setQuote(res.data))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        generateQuote()
    }, [])

    return (
        <div className="rquote-root">
            <h1>Random Quote Generator</h1>
            <div>Generate any random quote to get some inspiration!</div>
            {
                quote && (
                    <div className="rquote-content">
                        <div className="rquote-quote">{quote.content}</div>
                        <div className="rquote-author">- {quote.author}</div>
                    </div>
                )
            }
            <button className="rquote-button" onClick={generateQuote}>
                Generate Quote
            </button>
        </div>
    )
}