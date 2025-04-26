import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export type RaceProps = {
    name: string,
    circuit: string,
    winner: string
}

export default function Race({ name, circuit, winner }: RaceProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.primaryContent}>{name}</Text>
            <Text style={styles.secondaryContent}>
                <Text style={{ fontWeight: 'bold' }}>Circuito: </Text>{circuit}
            </Text>
            <Text style={styles.secondaryContent}>
                <Text style={{fontWeight: 'bold'}}>Vencedor: </Text>{winner}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    primaryContent: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryContent: {
        fontSize: 16,
        color: '#555',
    }
})
