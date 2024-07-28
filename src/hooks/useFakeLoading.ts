/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const useFakeLoading = (duration: number, triggers?: any) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), duration);
      }, []);
    
    if (triggers && triggers.length > 0) {
        useEffect(() => {
            setLoading(true);
            setTimeout(() => setLoading(false), duration);
        }, triggers);
    }

    return {
        loading,
    }
}