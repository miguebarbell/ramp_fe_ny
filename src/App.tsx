import React, {useEffect, useState} from "react";
import "./App.css";

function App() {
    const challengeUrl: string = "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge";
    const [word, setWord] = useState("");
    const [nodes, setNodes] = useState<Document>();
    const [url, setUrl] = useState("");
    const [typeWWord, setTypeWWord] = useState("");
    const parser = new DOMParser();
    useEffect(() => {
        fetch(challengeUrl)
            .then(res => res.text())
            .then(res => {
                setNodes(parser.parseFromString(res, "text/xml"));
            });
    }, []);
    useEffect(() => {
        let cypherUrl = "";
        nodes?.querySelectorAll("code[data-class^=\"23\"] > div[data-tag$=\"93\"] > span[data-id*=\"21\"] > i.char")
            .forEach(element => { cypherUrl += element.getAttribute("value"); });
        setUrl(cypherUrl);
    }, [nodes]);
    useEffect(() => {
        fetch(url)
            .then(res => res.text())
            // .then(res => {
            //     console.log(parser.parseFromString(res, "text/xml"));
            // })
            .then(res => {
                if (res.at(0) !== "<") {
                    setWord(res);
                }
            });
    }, [url]);
    useEffect(() => {
        let interval: any;
        interval = setInterval(() => {
            setTypeWWord(prev => {
                    if (word.at(prev.length)) return prev + word.at(prev.length);
                    else {
                        clearInterval(interval);
                        return prev;
                    }
                }
            );
        }, 500);
        return () => clearInterval(interval);
    }, [word]);
    return (
        <>
            {word === "" ? "loading..." : typeWWord}
        </>
    );
}

export default App;
