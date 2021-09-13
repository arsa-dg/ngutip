import { useEffect, useState } from "react";
import { fetchQuotes } from "../api/fetchQuotes";
import { QuoteType } from "../interfaces/QuoteInterface";
import { colors } from "../utils/constants/Colors";

const Quote: React.FC = () => {
  const [quotes, setQuotes] = useState<Array<QuoteType>>([]);
  const [quote, setQuote] = useState<QuoteType>();

  let i;
  var color = colors[Math.floor(Math.random()*colors.length)];

  const getQuotes = async () => {
    fetchQuotes()
      .then(data => {
        setQuotes(data);
      })
  };

  useEffect(()=> {
    getQuotes();
  },[]);

  useEffect(() => {
    i = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[i]);
  }, [quotes])

  const handleClick = () => {
    i = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[i]);
  }

  if (!quote) return null;
  
  return (
    <div className="container" style={{backgroundColor: color}}>
      <div className="card">
        <h1 style={{color: color}}>{`"`} {quote?.text} {`"`}</h1>
        <h2 style={{color: color}}>- {quote?.author ? quote?.author: "unknown"}</h2>
        <div className="buttons">
          <a
            className="button"
            href={`https://twitter.com/intent/tweet?hashtags=ngutip&text="${quote!.text}"%0D- ${quote!.author ? quote?.author: "unknown"}%0Dngutip.netlify.app%0D`}
            target="_blank"
            style={{backgroundColor: color}}
          >
            Tweet
          </a>
          <button 
            className="button"
            onClick={handleClick}
            style={{backgroundColor: color}}
          >
            Next
          </button>
        </div>
      </div>
      <style jsx>{`
        .container {
          height: 100vh;
        }
        .card {
          position: absolute;
          margin: 33vh 33vw;
          height: 34vh;
          width: 34vw;
          padding: 1em;
          background-color: white;
          box-shadow: 0 3px 10px rgb(0 0 0 / 0.5);
          border-radius: 0.5em;
        }
        h1 {
          font-size: 1.25em;
        }
        h2 {
          font-size: 1em;
          text-align: right;
        }
        .buttons {
          position: absolute;
          bottom: 1em;
          width: 94%;
          display: flex;
          justify-content: space-between;
        }
        .button {
          padding: 0.75em 1em;
          color: white;
          cursor: pointer;
          border: none;
          border-radius: 0.5em;
          font-size: 1em;
        }
      `}</style>
    </div>
  )
};

export default Quote;