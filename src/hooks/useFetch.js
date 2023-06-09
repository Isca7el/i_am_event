import {useEffect, useState} from "react";

export const useFetch = (url, setCurrentData) => {
    const [data, setData] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(url);
                if(!resp.ok){
                    setError(true);
                    setIsLoading(false);
                    return;
                }

                const data = await resp.json();
                setData(data);
                setCurrentData(data);
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