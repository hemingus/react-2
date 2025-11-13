import { useState } from "react"

export default function CookieClicker() {
    const [points, setPoints] = useState(0);

    function handleClick() {
        setPoints(prev => prev + 1);
    }

    return (
        <div className="cookie-clicker">
            <h2>Cookie Clicker</h2>
            <img src="cookiemonster.png" alt="Cookie monster eating cookie"/>
            <button className="cookie-button" onClick={handleClick}>
                <img
                    src="cookie.png"
                    alt="Image of a Cookie"
                />
            </button>
            <p>{`Points: ${points}`}</p>
        </div>
    )
}


