import { useState, useEffect } from "react";


export default function CatFacts() {
    const [catFact, setCatFact] = useState(null);
    const [catImage, setCatImage] = useState("");
    const [loading, setLoading] = useState(true);

    function getCatFact() {
        setLoading(true);
        fetch("https://catfact.ninja/fact")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCatFact(data.fact);
            })  
    }

    function getCatImage() {
        
        fetch("https://api.thecatapi.com/v1/images/search")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCatImage(data[0].url);
            })
    }

    function getCat() {
        getCatImage();
        getCatFact();
        setLoading(false);
    }

    useEffect(() => {
        getCat();
    }, [])

    return (
        <div className="cat-facts">
            <h2>Cat Facts</h2>
            {catImage && <img src={catImage} alt="Image of a cat" />}
            {loading ? <p>loading...</p> : 
            <div>
                <button onClick={getCat}>Get new cat</button>
                <p>Fun fact: <br/>{catFact}</p>
            </div>}
        </div>
    )
}