import { useState, useEffect } from 'react';
import { saveData, getData } from '../helpers/asyncStorageHelper';

interface Ayah {
    data: {
        text: string;
        number: number;
        surah: {
            englishName: string;
            number: number;
        };
    };
}

const useFetchAyah = (ayahNumber: number) => {
    const [data, setData] = useState<Ayah | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const offlineData: Ayah | null = await getData(`ayah-${ayahNumber}`);
                if (offlineData) {
                    setData(offlineData);
                } else {
                    const response = await fetch(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/en.asad`);
                    const result = await response.json();
                    console.log("Fetched from API:", result);
                    setData(result);
                    await saveData(`ayah-${ayahNumber}`, result);
                }
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ayahNumber]);

    return { data, loading, error };
};

export default useFetchAyah;
