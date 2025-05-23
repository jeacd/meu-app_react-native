import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import Race from '@/components/race/Race'
import { useState, useEffect, useCallback } from 'react'
import { IRace } from '@/interfaces/IRace'
import { ThemedText } from '@/components/ThemedText'

import * as Location from 'expo-location'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { router } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'

export default function RacesList() {
    const [races, setRaces] = useState<IRace[]>([])


    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        async function getCurrentLocation() {
      
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }
            getCurrentLocation();
    }, []);

    let text = 'Aguardando...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                try {
                    const data = await AsyncStorage.getItem('@Formula1App:races')
                    const racesData = data != null ? JSON.parse(data) : []
                    setRaces(racesData)
                } catch (e) {
                }
            }
            getData()
        }, [])
    )

    const openForm = (race?: IRace) => {
        if (race) {
            router.push({ pathname: '/screens/raceForm', params: { id: race.id.toString() } })
        } else {
            router.push('/screens/raceForm')
        }
    }

    const onDelete = (id: number) => {
        const newRaces = races.filter(race => race.id !== id)
        setRaces(newRaces)
        AsyncStorage.setItem('@Formula1App:races', JSON.stringify(newRaces))
    }


    return (
        <ParallaxScrollView headerBackgroundColor={{ light: '#ECECEC', dark: '#202020' }}>
            <ThemedView style={styles.headerContainer}>
                <ThemedText>{text}</ThemedText>
                <TouchableOpacity onPress={() => openForm()}>
                    <Text style={styles.headerButton}>+</Text>
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.container}>
                {races.map(race => (
                    <TouchableOpacity key={race.id} onPress={() => openForm(race)}>
                        <Race name={race.name} circuit={race.circuit} winner={race.winner} id={race.id} onDelete={onDelete} />
                    </TouchableOpacity>
                ))}
            </ThemedView>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 16,
        alignItems: 'flex-end',
    },
    headerButton: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    container: {
        padding: 16,
    },
})
