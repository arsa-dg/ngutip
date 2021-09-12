import { useEffect, useState } from "react";
import { fetchQuotes } from "../api/fetchQuotes";
import { QuoteType } from "../interfaces/QuoteInterface";

const Quote: React.FC = () => {
  const [quotes, setQuotes] = useState<Array<QuoteType>>([]);
  const [quote, setQuote] = useState<QuoteType>();
  const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];
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
        <h1 style={{color: color}}><span>"</span>{quote?.text}<span>"</span></h1>
        <h2 style={{color: color}}>- {quote?.author ? quote?.author: "unknown"}</h2>
        <div className="buttons">
          <button className="twt-btn">Tweet</button>
          <button className="twt-next" onClick={handleClick}>hah</button>
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
        }
        .twt-next {
          
        }
      `}</style>
    </div>
  )
};

export default Quote;