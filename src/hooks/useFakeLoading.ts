/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const useFakeLoading = (duration: number, trigger?: any) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), duration);
      }, []);
    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), duration);
    }, [trigger]);

    return {
        loading,
    }
}