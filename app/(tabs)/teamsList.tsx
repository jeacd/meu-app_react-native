import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import Team from '@/components/team/Team'
import { useState } from 'react'
import { ITeam } from '@/interfaces/ITeam'
import TeamModal from '@/components/modals/TeamModal'

export default function TeamsList() {
    const [teams, setTeams] = useState<ITeam[]>([])
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const onAdd = (name: string, pilot1: string, pilot2: string) => {
        const newTeam: ITeam = {
            id: Math.floor(Math.random() * 100000),
            name,
            pilot1,
            pilot2
        }
        setTeams([...teams, newTeam])
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
                {teams.map(team => (
                    <Team key={team.id} name={team.name} pilot1={team.pilot1} pilot2={team.pilot2} />
                ))}
            </ThemedView>

            <TeamModal visible={modalVisible} onCancel={() => setModalVisible(false)} onAdd={onAdd} />
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
