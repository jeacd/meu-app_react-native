import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import Race from '@/components/race/Race'
import { useState, useEffect } from 'react'
import { IRace } from '@/interfaces/IRace'
import RaceModal from '@/components/modals/RaceModal'
import { ThemedText } from '@/components/ThemedText'

import * as Location from 'expo-location'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function RacesList() {
    const [races, setRaces] = useState<IRace[]>([])
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [selectedRace, setSelectedRace] = useState<IRace | undefined>(undefined)


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

    useEffect(() => {
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

    const onAdd = (name: string, circuit: string, winner: string, id?: number) => {
        if (!id || id <= 0) {
            const newRace: IRace = {
                id: Math.floor(Math.random() * 100000),
                name,
                circuit,
                winner
            }
            const updatedRaces = [...races, newRace];
            setRaces(updatedRaces);
            AsyncStorage.setItem('@Formula1App:races', JSON.stringify(updatedRaces));
        }
        else {
            races.forEach(race => {
                if (race.id == id) {
                    race.name = name
                    race.circuit = circuit
                    race.winner = winner
                }
            })
            AsyncStorage.setItem('@Formula1App:races', JSON.stringify(races))
        }
        setModalVisible(false)
    }

    const onDelete = (id: number) => {
        const newRaces = races.filter(race => race.id !== id)
        setRaces(newRaces)
        AsyncStorage.setItem('@Formula1App:races', JSON.stringify(newRaces))
        setModalVisible(false)
    }

    const openModal = () => {
        setSelectedRace(undefined)
        setModalVisible(true)
    }
    const openEditModal = (selectedRace: IRace) => {
        setSelectedRace(selectedRace)
        setModalVisible(true)
    }
    const closeModal = () => {
        setSelectedRace(undefined)
        setModalVisible(false)
    }

    return (
        <ParallaxScrollView headerBackgroundColor={{ light: '#ECECEC', dark: '#202020' }}>
            <ThemedView style={styles.headerContainer}>
                <ThemedText>{text}</ThemedText>
                <TouchableOpacity onPress={() => openModal()}>
                    <Text style={styles.headerButton}>+</Text>
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.container}>
                {races.map(race => (
                    <TouchableOpacity key={race.id} onPress={() => openEditModal(race)}>
                        <Race name={race.name} circuit={race.circuit} winner={race.winner} id={race.id} onDelete={onDelete} />
                    </TouchableOpacity>
                ))}
            </ThemedView>

            <RaceModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                race={selectedRace}
            />
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
