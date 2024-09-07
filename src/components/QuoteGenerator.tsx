import React, {useState, useEffect} from 'react';
import { Quotes } from '../types/Quotes';
import { API_URL }  from '../config';
import { fetchToken } from '../services/authServices';
import { Token } from '../types/Token';


function QuoteGenerator() {

    const [quotes, setQuotes] = useState<Quotes[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<Token | null>(null);

    useEffect(() => {
        fetchQuote();
    }, []);


    const fetchQuote = async () => {
        
        try{
            const response = await fetch(`${API_URL}`)
            if (!response.ok){
                throw new Error('Failed to fetch');
            }
            const data: Quotes[] = await response.json();
            setQuotes(data);
        }catch (error){
            setError(
                error instanceof Error ? error.message : ''
            );
        }
    }

    const handleButtonClick = () => {
        fetchQuote();
    };

    const refreshPage = () => {
        window.location.reload();
    }
    
    const handleShareClick = (quote: Quotes[]) => {
        const content = quote.map(q => (
            q.content
        ))
        const author = quote.map(q => (
            q.author
        ))
        const shareText = `"${content}"  -${author}`;
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        window.open(shareUrl, '_blank');
    };

    if (error){
        return (
            <div className='content'>
                <span className='error'>Error : {error}</span>
                <button onClick={refreshPage} className="errorBtn">Retry</button>
            </div>
        );  
    }

    return (
        <div className='content'>
            <h1>Quotes generator</h1>
            {quotes.map(q => (
                <>
                <span>
                    <h4>"{q.content}"</h4>
                    <h6 className='author'>{q.author}</h6>
                </span>
                </>
            ))}
            <div className='btn'>
                <button onClick={handleButtonClick}>Generate new quote</button>
                <button className='shareBtn' onClick={() => handleShareClick(quotes)}>Share on X</button>
            </div>
        </div>
    );
};

export default QuoteGenerator;