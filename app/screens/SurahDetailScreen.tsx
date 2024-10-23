import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../MainApp'; 

type SurahDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'SurahDetail'>;

const SurahDetailScreen = ({ route }: SurahDetailScreenProps) => {
    const { surah } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{surah.englishName}</Text>
            <Text style={styles.subtitle}>{surah.revelationType} - {surah.numberOfAyahs} Verses</Text>
            <Text style={styles.arabicName}>{surah.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    arabicName: {
        fontSize: 28,
        color: '#4B0082',
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default SurahDetailScreen;
