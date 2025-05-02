import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IconSymbol } from '@/components/ui/IconSymbol'

export type RaceProps = {
    name: string
    circuit: string
    winner: string
    id: number
    onDelete: (id: number) => void
}

export default function Race({ name, circuit, winner, id, onDelete }: RaceProps) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.primaryContent}>{name}</Text>
                <Text style={styles.secondaryContent}>
                    <Text style={{ fontWeight: 'bold' }}>Circuito: </Text>{circuit}
                </Text>
                <Text style={styles.secondaryContent}>
                    <Text style={{ fontWeight: 'bold' }}>Vencedor: </Text>{winner}
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
