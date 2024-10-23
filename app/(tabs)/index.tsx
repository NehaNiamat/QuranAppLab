import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import useFetchSurahs from '../../hooks/useFetchSurahs';

// Define the Surah type
interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

const SurahScreen = () => {
    const { data, loading, error } = useFetchSurahs();

    if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
    if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

    const renderSurahItem = ({ item }: { item: Surah }) => (
        <View style={styles.surahItem}>
            <Text style={styles.surahNumber}>{item.number}</Text>
            <View style={styles.surahDetails}>
                <Text style={styles.surahName}>{item.englishName}</Text>
                <Text style={styles.surahInfo}>{item.revelationType} - {item.numberOfAyahs} Verses</Text>
            </View>
            <Text style={styles.surahArabic}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Other UI elements */}
            <FlatList
                data={data?.data}
                renderItem={renderSurahItem}
                keyExtractor={(item: Surah) => item.number.toString()}
                contentContainerStyle={styles.surahList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    surahItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    surahNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4B0082',
    },
    surahDetails: {
        flex: 1,
        marginLeft: 10,
    },
    surahName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    surahInfo: {
        fontSize: 14,
        color: '#888',
    },
    surahArabic: {
        fontSize: 18,
        color: '#4B0082',
        fontWeight: 'bold',
    },
    loadingText: {
        flex: 1,
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
    },
    errorText: {
        flex: 1,
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: 'red',
    },
    surahList: {
        paddingBottom: 100,
    },
});

export default SurahScreen;
