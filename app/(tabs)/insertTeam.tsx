import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ITeam } from '@/interfaces/ITeam'
import { ThemedView } from "@/components/ThemedView"
import { useColorScheme } from '@/hooks/useColorScheme';

export type InsertTeamProps = {
    visible: boolean
    onAdd: (name: string, pilot1: string, pilot2: string, id?: number) => void
    onCancel: () => void
    team?: ITeam
}

export default function RaceModal({ visible, onAdd, onCancel, team }: InsertTeamProps) {
    const [name, setName] = useState('')
    const [pilot1, setPilot1] = useState('')
    const [pilot2, setPilot2] = useState('')
    const [id, setId] = useState<number>(0)


    useEffect(() => {
        if (team) {
            setName(team.name);
            setPilot1(team.pilot1);
            setPilot2(team.pilot2);
            setId(team.id);
        } else {
            setName('');
            setPilot1('');
            setPilot2('');
            setId(0);
        }
    }, [team]);

    return (
        <ParallaxScrollView headerBackgroundColor={{ light: '#ECECEC', dark: '#202020' }}>
            <View style={styles.container}>
                <ThemedView>
                    <TouchableOpacity style={{alignItems: 'center'}}>
                        <Text style={styles.headerText}>Inserir dados</Text>
                    </TouchableOpacity>
                </ThemedView>
                
                <View style={styles.contentContainer}>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Nome da equipe'
                        value={name}
                        onChangeText={setName}
                        autoFocus
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Nome do piloto 1'
                        value={pilot1}
                        onChangeText={setPilot1}
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Nome do piloto 2'
                        value={pilot2}
                        onChangeText={setPilot2}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={
                            () => {
                                onAdd(name, pilot1, pilot2, id)
                                setName('')
                                setPilot1('')
                                setPilot2('')
                            }}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonCancel} onPress={
                            () => {
                                onCancel()
                                setName('')
                                setPilot1('')
                                setPilot2('')
                            }}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        paddingBottom: 10
    },
    boxInput: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: 'white'
    },
    buttonAdd: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    buttonDelete: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    buttonCancel: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white'
    }
});