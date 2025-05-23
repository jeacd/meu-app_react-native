import { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ITeam } from '@/interfaces/ITeam'

import { router, useLocalSearchParams } from 'expo-router'

export default function TeamForm() {
    const { id } = useLocalSearchParams()

    const [name, setName] = useState('')
    const [pilot1, setPilot1] = useState('')
    const [pilot2, setPilot2] = useState('')
    const [teamId, setTeamId] = useState<number | null>(null)
    

    useEffect(() => {
        if (id) {
            loadTeamData(Number(id))
        }
    }, [id])

    const loadTeamData = async (id: number) => {
        try {
            const data = await AsyncStorage.getItem('@Formula1App:teams')
            const teams: ITeam[] = data ? JSON.parse(data) : []
            const selectedTeam = teams.find(team => team.id === id)
            if (selectedTeam) {
                setName(selectedTeam.name)
                setPilot1(selectedTeam.pilot1)
                setPilot2(selectedTeam.pilot2)
                setTeamId(selectedTeam.id)
            }
        } catch (error) {
        }
    }

    const onAdd = async () => {
        try {
            const data = await AsyncStorage.getItem('@Formula1App:teams')
            const teams: ITeam[] = data ? JSON.parse(data) : []

            if (!name || !pilot1 || !pilot2) {
                return
            }

            if (teamId) {
                const updatedTeams = teams.map(team => 
                    team.id === teamId 
                    ? { id: teamId, name, pilot1, pilot2 } 
                    : team
                )
                await AsyncStorage.setItem('@Formula1App:teams', JSON.stringify(updatedTeams))
            } else {
                const newTeam: ITeam = {
                    id: Math.floor(Math.random() * 100000),
                    name,
                    pilot1,
                    pilot2
                }
                const updatedTeams = [...teams, newTeam]
                await AsyncStorage.setItem('@Formula1App:teams', JSON.stringify(updatedTeams))
            }

            setName('')
            setPilot1('')
            setPilot2('')
            setTeamId(null)
            router.replace('/(tabs)/teamsList')
        } catch (error) {
        }
    }
    const onCancel = () => {
        setName('')
        setPilot1('')
        setPilot2('')
        setTeamId(null)
        router.replace('/(tabs)/teamsList')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{teamId ? 'Editar Equipe' : 'Nova Equipe'}</Text>
            <TextInput 
                placeholder="Nome da equipe"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <TextInput 
                placeholder="Nome do piloto 1"
                style={styles.input}
                value={pilot1}
                onChangeText={setPilot1}
            />
            <TextInput 
                placeholder="Nome do piloto 2"
                style={styles.input}
                value={pilot2}
                onChangeText={setPilot2}
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
