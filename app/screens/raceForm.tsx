import { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IRace } from '@/interfaces/IRace'

import { router, useLocalSearchParams } from 'expo-router'

export default function raceForm() {
    const { id } = useLocalSearchParams()

    const [name, setName] = useState('')
    const [circuit, setCircuit] = useState('')
    const [winner, setWinner] = useState('')
    const [raceId, setRaceId] = useState<number | null>(null)
    

    useEffect(() => {
        if (id) {
            loadRaceData(Number(id))
        }
    }, [id])

    const loadRaceData = async (id: number) => {
        try {
            const data = await AsyncStorage.getItem('@Formula1App:races')
            const races: IRace[] = data ? JSON.parse(data) : []
            const selectedRace = races.find(race => race.id === id)
            if (selectedRace) {
                setName(selectedRace.name)
                setCircuit(selectedRace.circuit)
                setWinner(selectedRace.winner)
                setRaceId(selectedRace.id)
            }
        } catch (error) {
        }
    }

    const onAdd = async () => {
        try {
            const data = await AsyncStorage.getItem('@Formula1App:races')
            const races: IRace[] = data ? JSON.parse(data) : []

            if (!name || !circuit || !winner) {
                return
            }

            if (raceId) {
                const updatedRaces = races.map(race => 
                    race.id === raceId 
                    ? { id: raceId, name, circuit, winner } 
                    : race
                )
                await AsyncStorage.setItem('@Formula1App:races', JSON.stringify(updatedRaces))
            } else {
                const newRace: IRace = {
                    id: Math.floor(Math.random() * 100000),
                    name,
                    circuit,
                    winner
                }
                const updatedRaces = [...races, newRace]
                await AsyncStorage.setItem('@Formula1App:races', JSON.stringify(updatedRaces))
            }

            setName('')
            setCircuit('')
            setWinner('')
            setRaceId(null)
            router.replace('/(tabs)/racesList')
        } catch (error) {
        }
    }
    const onCancel = () => {
        setName('')
        setCircuit('')
        setWinner('')
        setRaceId(null)
        router.replace('/(tabs)/racesList')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{raceId ? 'Editar Corrida' : 'Nova Corrida'}</Text>
            <TextInput 
                placeholder="Nome da corrida"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput 
                placeholder="Nome do circuito"
                style={styles.input}
                value={circuit}
                onChangeText={setCircuit}
            />
            <TextInput 
                placeholder="Nome do vencedor"
                style={styles.input}
                value={winner}
                onChangeText={setWinner}
            />

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.buttonSave} onPress={onAdd}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCancel} onPress={() => onCancel()}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonSave: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5
    },
    buttonCancel: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
