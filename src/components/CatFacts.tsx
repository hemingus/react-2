import { useState, useEffect } from "react";


export default function CatFacts() {
    const [catFact, setCatFact] = useState(null);
    const [catImage, setCatImage] = useState("");
    const [loading, setLoading] = useState(true);

    async function getCatFact() {
        try {
            setLoading(true);
            const res = await fetch("https://catfact.ninja/fact");
            const data = await res.json();
            setCatFact(data.fact);
        }
        catch (err){
            console.error(`Fetch failed: ${err}`);
        }
        finally {
            setLoading(false);
        }
    }

    async function getCatImage() {
        try {
            setLoading(true);
            const res = await fetch("https://api.thecatapi.com/v1/images/search");
            const data = await res.json();
            setCatImage(data[0].url);
        }
        catch (err){
            console.error(`Fetch failed: ${err}`);
        }
        finally {
            setLoading(false);
        }
    }
    

    async function getCat() {
        await getCatImage();
        await getCatFact();
    }

    useEffect(() => {
        getCat();
        const interval = setInterval(() => {
            setLoading(false)
        }, 2000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="cat-facts">
            <h2>Cat Facts</h2>
            
            {loading ? 
            <div>
                <img src="loadingkitten.png" alt="Black kitten sitting and waiting"/>
                <p>loading...</p>
            </div>
            : 
            <>
                <p><span>Fun fact:</span> <br/>{catFact}</p>
                {catImage && <img src={catImage} alt="Image of a cat" />}
                <button onClick={getCat}>Get new cat</button>
            </>}
        </div>
    )
}