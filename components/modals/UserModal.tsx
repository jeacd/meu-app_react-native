import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, TouchableOpacity, Modal, TextInput } from "react-native"
import { IUser } from '@/interfaces/IUser'

export type UserModalProps = {
    visible: boolean
    onAdd: (user: string, password: string, id: number) => void
    onCancel: () => void
    userObj: IUser | undefined
}

export default function UserModal({ visible, onAdd, onCancel, userObj }: UserModalProps) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [id, setId] = useState<number>(0)

    useEffect(() => {
        if (userObj) {
            setUser(userObj.user);
            setPassword(userObj.password);
            setId(userObj.id);
        } else {
            setUser('');
            setPassword('');
            setId(0);
        }
    }, [userObj]);

    return (
        <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={() => { }}>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Inserir usuário'
                        value={user}
                        onChangeText={setUser}
                        autoFocus
                    />
                    <TextInput
                        style={styles.boxInput}
                        placeholder='Inserir senha'
                        value={password}
                        onChangeText={setPassword}
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={
                            () => {
                                onAdd(user, password, id)
                                setUser('')
                                setPassword('')
                            }}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonCancel} onPress={
                            () => {
                                onCancel()
                                setUser('')
                                setPassword('')
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
