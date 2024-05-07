import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { image500 } from '../../api/moviedb'


var { width, height } = Dimensions.get('window')

const MovieCard = ({ item, handleClick }) => {
    // console.log("item.poster_path: ", item.poster_path);
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                // source={require("../images/pushpa.jpg")}
                source={{ uri: image500(item.poster_path) }}
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