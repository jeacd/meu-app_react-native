import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import User from '@/components/user/User'
import { useState, useEffect } from 'react'
import { IUser } from '@/interfaces/IUser'
import UserModal from '@/components/modals/UserModal'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function UsersList() {
    const [users, setUsers] = useState<IUser[]>([])
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<IUser | undefined>(undefined)

    useEffect(() => {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem('@Formula1App:users')
                const usersData = data != null ? JSON.parse(data) : []
                setUsers(usersData)
            } catch (e) {
            }
        }
        getData()
    }, [])

    const onAdd = (user: string, password: string, id?: number) => {
        if (!id || id <= 0) {
            const newUser: IUser = {
                id: Math.floor(Math.random() * 100000),
                user,
                password,
            }
            const updateUsers = [...users, newUser];
            setUsers(updateUsers);
            AsyncStorage.setItem('@Formula1App:users', JSON.stringify(updateUsers));
        }
        else {
            users.forEach(actualUser => {
                if (actualUser.id == id) {
                    actualUser.user = user
                    actualUser.password = password
                }
            })
            AsyncStorage.setItem('@Formula1App:users', JSON.stringify(users))
        }
        setModalVisible(false)
    }

    const onDelete = (id: number) => {
        const newUsers = users.filter(user => user.id !== id)
        setUsers(newUsers)
        AsyncStorage.setItem('@Formula1App:users', JSON.stringify(newUsers))
        setModalVisible(false)
    }

    const openModal = () => {
        setSelectedUser(undefined)
        setModalVisible(true)
    }
    const openEditModal = (selectedUser: IUser) => {
        setSelectedUser(selectedUser)
        setModalVisible(true)
    }
    const closeModal = () => {
        setSelectedUser(undefined)
        setModalVisible(false)
    }

    return (
        <ParallaxScrollView headerBackgroundColor={{ light: '#ECECEC', dark: '#202020' }}>
            <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={() => openModal()}>
                    <Text style={styles.headerButton}>+</Text>
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.container}>
                {users.map(user => (
                    <TouchableOpacity key={user.id} onPress={() => openEditModal(user)}>
                        <User user={user.user} password={user.password} id={user.id} onDelete={onDelete} />
                    </TouchableOpacity>
                ))}
            </ThemedView>

            <UserModal
                visible={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                userObj={selectedUser}
            />
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
