import { useState, useEffect } from 'react';
import { saveData, getData } from '.././helpers/asyncStorageHelper';

interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

interface SurahResponse {
    data: Surah[];
}

const useFetchSurahs = () => {
    const [data, setData] = useState<SurahResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const offlineData: SurahResponse | null = await getData('surahs');
                if (offlineData) {
                    setData(offlineData);
                } else {
                    const response = await fetch('https://api.alquran.cloud/v1/surah');
                    const result: SurahResponse = await response.json();
                    console.log("Fetched from API:", result);
                    setData(result);
                    await saveData('surahs', result);
                }
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useFetchSurahs;
