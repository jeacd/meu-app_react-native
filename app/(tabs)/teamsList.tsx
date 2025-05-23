import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import Team from '@/components/team/Team'
import { useState, useEffect, useCallback } from 'react'
import { ITeam } from '@/interfaces/ITeam'
import { ThemedText } from '@/components/ThemedText'

import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { router } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'

export default function TeamsList() {
    const [teams, setTeams] = useState<ITeam[]>([])

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
                    const data = await AsyncStorage.getItem('@Formula1App:teams')
                    const teamsData = data != null ? JSON.parse(data) : []
                    setTeams(teamsData)
                } catch (e) {
                }
            }
            getData()
        }, [])
    )

    const openForm = (team?: ITeam) => {
        if (team) {
            router.push({ pathname: '/screens/teamForm', params: { id: team.id.toString() } })
        } else {
            router.push('/screens/teamForm')
        }
    }

    const onDelete = (id: number) => {
        const newTeams = teams.filter(team => team.id !== id)
        setTeams(newTeams)
        AsyncStorage.setItem('@Formula1App:teams', JSON.stringify(newTeams));
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
                {teams.map(team => (
                    <TouchableOpacity key={team.id} onPress={() => openForm(team)}>
                        <Team name={team.name} pilot1={team.pilot1} pilot2={team.pilot2} id={team.id} onDelete={onDelete} />
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
