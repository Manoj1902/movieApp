import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons';
import { stylesTheme, theme } from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../../api/moviedb';


var { width, height } = Dimensions.get('window')

const MovieScreen = () => {

    const [isFavourite, setIsFavourite] = useState(false)
    const [cast, setCast] = useState([1, 2, 3, 4, 5])
    const [similarMovies, setSimilarMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState({})
    const movieName = "Ant-Man and the Wasp: Quantumania"

    const { params: item } = useRoute()
    const navigation = useNavigation()

    useEffect(() => {
        // console.log('item id: ', item.id)
        setLoading(true)
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    }, [item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id)
        // console.log('Got Movie Details: ', data)
        if (data) setMovie(data)
        setLoading(false)
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id)
        // console.log('Got Movie Credits: ', data)
        if (data && data.cast) setCast(data.cast)
        // setLoading(false)
    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id)
        // console.log('Got Similar Movie: ', data)
        if (data && data.results) setSimilarMovies(data.results)
        // setLoading(false)
    }

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={styles.scrollConteiner}>
            <StatusBar translucent backgroundColor="transparent" />
            {/* back button and movie poster */}

            <View style={styles.headerContainer}>
                <SafeAreaView style={styles.headerContent}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Icon name='chevron-back' size={30} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                        <Icon name='heart-sharp' size={35} color={isFavourite ? theme.background : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (<Loading />) : (
                        <View>
                            <Image
                                // source={require('../images/pushpa.jpg')}
                                source={{ uri: image500(movie?.poster_path) || fallbackMoviePoster }}
                                style={{ width, height: height * 0.55 }} />
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.7)', 'rgba(23,23,23,1)']}
                                style={styles.linearGradient}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                            />
                        </View>
                    )
                }

            </View>


            {/* Movie details  */}
            <View style={{ marginTop: -(height * 0.09), marginVertical: 12 }}>


                {/* Title */}
                <Text style={styles.movieTitle}>
                    {movie?.title}
                </Text>


                {/* Status, Release, Runtime */}


                {
                    movie?.id ? (
                        <Text style={styles.movieStatusText}>
                            {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
                        </Text>
                    ) : null
                }

                {/* geners */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 16, marginLeft: 8 }}>

                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length
                            return (
                                <Text key={index} style={{ color: 'rgb(163 163 163);', fontWeight: '600', fontSize: 14, textAlign: 'center', marginBottom: 10 }}>
                                    {genre?.name} {showDot ? '• ' : null}
                                </Text>
                            )
                        })
                    }
                </View>


                {/* Description */}
                <Text style={styles.descriptionText}>
                    {
                        movie?.overview
                    }
                </Text>

            </View>


            {/* Cast */}

            <Cast cast={cast} navigation={navigation} />

            {/* Similar movies */}
            <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />

        </ScrollView>
    )
}

export default MovieScreen

const styles = StyleSheet.create({
    scrollConteiner: {
        flex: 1,
        backgroundColor: "rgb(23,23,23)",
    },
    headerContainer: {
        width: '100%'
    },
    headerContent: {
        position: 'absolute',
        zIndex: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    backButton: {
        borderRadius: 12,
        backgroundColor: theme.background,
        padding: 4
    },
    linearGradient: {
        width: width,
        height: height * 0.40,
        position: 'absolute',
        bottom: 0
    },
    movieTitle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        lineHeight: 36,
        fontWeight: 'bold',
        letterSpacing: 0.05,
        marginBottom: 8
    },
    movieStatusText: {
        color: 'rgb(163,163,163)',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    descriptionText: {
        color: 'rgb(163,163,163)',
        marginHorizontal: 16,
        letterSpacing: 0.05,
        textAlign: 'justify'
    }
})