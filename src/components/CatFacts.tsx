import { useState, useEffect } from "react";


export default function CatFacts() {
    const [catFact, setCatFact] = useState(null);
    const [catImage, setCatImage] = useState("");
    const [loading, setLoading] = useState(true);

    async function getCat() {
        setLoading(true);
        try {
            const [res1, res2] = await Promise.all([
                fetch("https://catfact.ninja/fact").then(res => res.json()),
                fetch("https://api.thecatapi.com/v1/images/search").then(res => res.json())
            ]);

            const fact = res1.fact;
            const imageUrl = res2[0].url;

            await new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.src = imageUrl;
                img.onload = () => resolve();
                img.onerror = reject;

            setCatFact(fact);
            setCatImage(imageUrl);
        });
        }
        catch (err) {
            console.error(`Fetch failed: ${err}`);
        }
        finally {
            setLoading(false);
        } 
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