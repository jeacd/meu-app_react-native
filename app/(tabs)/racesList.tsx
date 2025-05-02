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
    const [selectedRace, setSelectedRace] = useState<IRace | undefined>(undefined)

    useEffect(() => {
        setRaces(raceData);
    }, []);

    const onAdd = (name: string, circuit: string, winner: string, id?: number) => {
        if (!id || id <= 0) {
            const newRace: IRace = {
                id: Math.floor(Math.random() * 100000),
                name,
                circuit,
                winner
            }
            setRaces([...races, newRace])
        }
        else {
            races.forEach(race => {
                if (race.id == id) {
                    race.name = name
                    race.circuit = circuit
                    race.winner = winner
                }
            })
        }
        setModalVisible(false)
    }

    const onDelete = (id: number) => {
        const newRaces = races.filter(race => race.id !== id)
        setRaces(newRaces)
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
