import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export type TeamProps = {
    name: string,
    pilot1: string
    pilot2: string
}

export default function Team({name, pilot1, pilot2}: TeamProps){
    return(
        <View style={styles.container}>
            <Text style={styles.primaryContent}>{name}</Text>
            <Text style={styles.secondaryContent}>
                <Text style={{fontWeight: 'bold'}}>Piloto 1: </Text>{pilot1}
            </Text>
            <Text style={styles.secondaryContent}>
                <Text style={{fontWeight: 'bold'}}>Piloto 2: </Text>{pilot2}
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
