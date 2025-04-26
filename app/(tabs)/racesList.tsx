import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import Race from '@/components/race/Race'
import { useState, useEffect } from 'react'
import { IRace } from '@/interfaces/IRace'
import RaceModal from '@/components/modals/RaceModal'
import raceData from '@/assets/data/races.json'

export default function RacesList() {
    const [races, setRaces] = useState<IRace[]>([])
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    useEffect(() => {
        setRaces(raceData);
      }, []);

    const onAdd = (name: string, circuit: string, winner: string) => {
        const newRace: IRace = {
            id: Math.floor(Math.random() * 100000),
            name,
            circuit,
            winner
        }
        setRaces([...races, newRace])
        setModalVisible(false)
    }

    return (
        <ParallaxScrollView headerBackgroundColor={{ light: '#ECECEC', dark: '#202020' }}>
            <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.headerButton}>+</Text>
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.container}>
                {races.map(race => (
                    <Race key={race.id} name={race.name} circuit={race.circuit} winner={race.winner} />
                ))}
            </ThemedView>

            <RaceModal visible={modalVisible} onCancel={() => setModalVisible(false)} onAdd={onAdd} />
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
