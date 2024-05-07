import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../../api/moviedb';
import MovieCard from './MovieCard';

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
                firstItem={0}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                sliderStyle={{ display: 'flex', alignItems: 'center' }}
            />

        </View>
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

})