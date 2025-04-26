import React, { useState } from "react"
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native"

export type RaceModalProps = {
    visible: boolean
    onAdd: (name: string, circuit: string, winner: string) => void
    onCancel: () => void
}

export default function RaceModal({ visible, onAdd, onCancel }: RaceModalProps) {
    const [name, setName] = useState('')
    const [circuit, setCircuit] = useState('')
    const [winner, setWinner] = useState('')

    return (
        <Modal visible={visible} animationType='fade' transparent={true}>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Nome'
                        value={name}
                        onChangeText={setName}
                        autoFocus
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Circuito'
                        value={circuit}
                        onChangeText={setCircuit}
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Vencedor'
                        value={winner}
                        onChangeText={setWinner}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={
                            () => {
                                onAdd(name, circuit, winner)
                                setName('')
                                setCircuit('')
                                setWinner('')
                            }}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonCancel} onPress={
                            () => {
                                onCancel()
                                setName('')
                                setCircuit('')
                                setWinner('')
                            }}>
                            <Text style={styles.buttonText}>Cancel</Text>
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
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    buttonCancel: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})
