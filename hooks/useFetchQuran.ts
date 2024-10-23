import { useState, useEffect } from 'react';
import { saveData, getData } from '../helpers/asyncStorageHelper';

interface Surah {
    number: number;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

interface QuranData {
    data: {
        surahs: Surah[];
    };
}

const useFetchQuran = () => {
    const [data, setData] = useState<QuranData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const offlineData: QuranData | null = await getData('quran');
                if (offlineData) {
                    setData(offlineData);
                } else {
                    const response = await fetch('https://api.alquran.cloud/v1/quran/en.asad');
                    const result = await response.json();
                    console.log("Fetched from API:", result);
                    setData(result);
                    await saveData('quran', result);
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

export default useFetchQuran;
