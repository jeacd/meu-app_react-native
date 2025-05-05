import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native"
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { IRace } from '@/interfaces/IRace'
import { ThemedView } from "@/components/ThemedView"

export type InsertRaceProps = {
    visible: boolean
    onAdd: (name: string, circuit: string, winner: string, id: number) => void
    onCancel: () => void
    race: IRace | undefined
}

export default function InsertRace({ onAdd, onCancel, race }: InsertRaceProps) {
    const [name, setName] = useState('')
    const [circuit, setCircuit] = useState('')
    const [winner, setWinner] = useState('')
    const [id, setId] = useState<number>(0)

    useEffect(() => {
        if (race) {
            setName(race.name);
            setCircuit(race.circuit);
            setWinner(race.winner);
            setId(race.id);
        } else {
            setName('');
            setCircuit('');
            setWinner('');
            setId(0);
        }
    }, [race]);

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
                        placeholder='Nome do piloto'
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Nome do circuito'
                        value={circuit}
                        onChangeText={setCircuit}
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Nome do vencedor'
                        value={winner}
                        onChangeText={setWinner}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={
                            () => {
                                onAdd(name, circuit, winner, id)
                                setName('')
                                setCircuit('')
                                setWinner('')
                            }}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonCancel} onPress={
                            () => {
                                onCancel()
                                setName('')
                                setCircuit('')
                                setWinner('')
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
        color: 'white',
        fontWeight: 'bold',
    },
})
