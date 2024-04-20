import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'

const MovieScreen = () => {
    const { params: item } = useRoute()
    useEffect(() => {
        // call movie details api
    }, [item])
    return (
        <View>
            <Text>MovieScreen</Text>
        </View>
    )
}

export default MovieScreen

const styles = StyleSheet.create({})