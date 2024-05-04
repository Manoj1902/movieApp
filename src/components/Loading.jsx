import { Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { theme } from '../../theme';


var { width, height } = Dimensions.get('window')

const Loading = () => {
    return (
        <View style={{ height, width, position: 'absolute', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Progress.CircleSnail thickness={5} size={100} color={theme.background} />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})