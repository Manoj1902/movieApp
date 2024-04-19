import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

var { width, height } = Dimensions.get('window')
const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={handleClick}>
            <Image
                source={require("../images/pushpa.jpg")}
                style={{
                    width: width * 0.6,
                    height: height * 0.4,
                    borderRadius: 20
                }}
            />
        </TouchableWithoutFeedback>
    )
}

export default MovieCard

const styles = StyleSheet.create({
    text: {
        color: 'white'
    }
})