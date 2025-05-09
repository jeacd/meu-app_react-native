import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native"
import { IRace } from '@/interfaces/IRace'

export type RaceModalProps = {
    visible: boolean
    onAdd: (name: string, circuit: string, winner: string, id: number) => void
    onCancel: () => void
    race: IRace | undefined
}

export default function RaceModal({ visible, onAdd, onCancel, race }: RaceModalProps) {
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
        <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={() => { }}>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Nome da corrida'
                        value={name}
                        onChangeText={setName}
                        autoFocus
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
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    boxInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
