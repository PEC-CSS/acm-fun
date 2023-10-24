import {useEffect, useState} from "react";
import axios from "axios";
import "../../styles/pages/activities/RandomMeme.css"

export const RandomMeme = () => {

    const [meme, setMeme] = useState()
    const [subreddit, setSubreddit] = useState("")
    const [link, setLink] = useState("")

    function Submit() {
        setLink(subreddit)
        setSubreddit("")   
        document.getElementById('text').value = ''   
        generateMeme()  
    }

    function GetName(val){
        setSubreddit("/"+val.target.value)
    }

    const generateMeme = () => {
        axios({
            method: "GET",
            url: "https://meme-api.com/gimme"+link
        }).then(res => setMeme(res.data))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        generateMeme()
    }, [])

    return (
        <div className="rmeme-root">
            <h1>Random Meme Generator</h1>
            <div>Enter the name of Reddit community you want to get memes from.</div>
            <div> Some examples are animememes, dankmemes, wholesomememes, etc. Submit empty box to get random memes</div>
            <input className="rmeme-text" placeholder="Enter name of community here" id="text" type="text" onChange={GetName}></input>
            <button className="rmeme-submit" onClick={Submit}>Submit</button>
            {
                meme && (
                        <div className="rmeme-meme"><img src={meme.url}></img></div>
                )
            }
            <button className="rmeme-button" onClick={generateMeme}>
                Generate Meme
            </button>
        </div>
    )
}