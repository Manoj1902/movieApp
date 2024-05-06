import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-svg';
import { image500 } from '../../api/moviedb';

var { width, height } = Dimensions.get('window')
const TrendingMovies = ({ data }) => {

    const navigation = useNavigation()

    const handleClick = (item) => {
        navigation.navigate('Movie', item)
    }
    return (

        <View style={styles.container}>
            <Text style={styles.title}>Trending Movies</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                sliderStyle={{ display: 'flex', alignItems: 'center' }}
            />

        </View>
    )
}


const MovieCard = ({ item, handleClick }) => {
    // console.log("item.poster_path: ", item.poster_path);
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                source={require("../images/pushpa.jpg")}
                // source={{ uri: image500(item.poster_path) }}
                style={{
                    width: width * 0.6,
                    height: height * 0.4,
                    borderRadius: 20
                }}
            />
        </TouchableWithoutFeedback>
    )
}


export default TrendingMovies

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    title: {
        color: 'white',
        fontSize: 20,
        marginHorizontal: 16,
        marginBottom: 10,
    },
    text: {
        color: 'white'
    }
})