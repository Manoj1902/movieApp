import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons';
import { stylesTheme } from '../../theme';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../../api/moviedb';

const Home = () => {
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation()


    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies()
        // console.log('Got trending Movies: ', data)
        if (data && data.results) setTrending(data.results)
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies()
        // console.log('Got upcoming Movies: ', data)
        if (data && data.results) setUpcoming(data.results)
        setLoading(false)
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies()
        // console.log('Got top rated Movies: ', data)
        if (data && data.results) setTopRated(data.results)
        setLoading(false)
    }


    return (
        <View style={styles.container}>
            <SafeAreaView style={{ marginBottom: 3 }} >
                <StatusBar barStyle={'light-content'} backgroundColor="#262626" />
                <View style={styles.headerCotainer}>
                    <Icon name='menu' size={30} color="white" />

                    <Text style={styles.logo}>
                        <Text style={stylesTheme.text}>M</Text>ovies
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <Icon name='search' size={30} color='white' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading ? (<Loading />) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}>
                        {/* Trending Movies Carousel */}
                        {trending.length > 0 && <TrendingMovies data={trending} />}

                        {/* Upcoming Movies */}
                        <MovieList title='Upcoming' data={upcoming} />

                        {/* Upcoming Movies */}
                        <MovieList title='Top Rated' data={topRated} />
                    </ScrollView>
                )
            }

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262626'
    },
    headerCotainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 12,
        marginVertical: 14
    },
    logo: {
        fontSize: 30,
        lineHeight: 36,
        fontWeight: 'bold',
        color: 'white'
    }
})