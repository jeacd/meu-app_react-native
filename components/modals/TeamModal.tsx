import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native"
import { ITeam } from "@/interfaces/ITeam"
export type TeamModalProps = {
    visible: boolean
    onAdd: (name: string, pilot1: string, pilot2: string, id?: number) => void
    onCancel: () => void
    team?: ITeam
}

export default function RaceModal({ visible, onAdd, onCancel, team }: TeamModalProps) {
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
        <Modal visible={visible} animationType='fade' transparent={true} onRequestClose={() => {}}>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
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
