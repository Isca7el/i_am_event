import {useEffect, useState} from "react";

export const useFetch = (url) => {
    const [data, setData] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(url);
                console.log(resp);
                if(!resp.ok){
                    setError(true);
                    setIsLoading(false);
                    return;
                }

                const data = await resp.json();
                console.log(data);
                setData(data);
                setError(false);
                setIsLoading(false);
            } catch (error){
                setError(true);
            }
        };

        fetchData().then(r => console.log(r));
    }, [url]);
    return { data, error, isLoading };
}