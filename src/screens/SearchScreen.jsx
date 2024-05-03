import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


var { width, height } = Dimensions.get('window')

const SearchScreen = () => {
    return (
        <SafeAreaView>
            <Text>SearchScreen</Text>
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({})