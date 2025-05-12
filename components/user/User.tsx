import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IconSymbol } from '@/components/ui/IconSymbol'

export type UserProps = {
    user: string
    password: string
    id: number
    onDelete: (id: number) => void
}

export default function User({ user, password, id, onDelete }: UserProps) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.primaryContent}>{user}</Text>
                <Text style={styles.secondaryContent}>
                    <Text style={{ fontWeight: 'bold' }}>Senha: </Text>{password}
                </Text>
            </View>

            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(id)}>
                <IconSymbol size={28} name="trash" color={'red'} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    primaryContent: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryContent: {
        fontSize: 16,
        color: '#555',
    },
    deleteButton: {
        justifyContent: 'center',
    }
})
