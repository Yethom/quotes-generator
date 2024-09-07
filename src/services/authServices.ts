import { Token } from "../types/Token";
import { API_URL } from "../config";

export const fetchToken = async(username: string, password: string): Promise<Token> => {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });

    if (!response.ok){
        throw new Error('Failed to fetch token')
    }

    const data: Token = await response.json();
    return data;
}