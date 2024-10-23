import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SurahScreen from './app/(tabs)/index';
import SurahDetailScreen from './app/screens/SurahDetailScreen'; 

// Define the RootStackParamList to declare parameters for each screen
export type RootStackParamList = {
    Surahs: undefined;
    SurahDetail: { surah: { 
        number: number;
        name: string;
        englishName: string;
        englishNameTranslation: string;
        numberOfAyahs: number;
        revelationType: string;
    }};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Surahs">
                <Stack.Screen 
                    name="Surahs" 
                    component={SurahScreen} 
                    options={{ title: 'Surahs' }} 
                />
                <Stack.Screen 
                    name="SurahDetail" 
                    component={SurahDetailScreen} 
                    options={{ title: 'Surah Details' }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
