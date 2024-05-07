import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { theme } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185 } from '../../api/moviedb'

var { width, height } = Dimensions.get('window')

const MovieList = ({ title, data, hideSeeAll }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={styles.textTwo}>See All</Text>
                        </TouchableOpacity>
                    )
                }

            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>

                {
                    data?.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push('Movie', item)}>
                                <View style={styles.movieImageContainer}>
                                    <Image
                                        // source={require('../images/antman.jpg')}
                                        source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                                        style={styles.movieImage} />
                                    <Text style={styles.movieNameText}>
                                        {
                                            item?.title?.length > 14 ? item.title.slice(0, 14) + "..." : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }

            </ScrollView>
        </View >
    )
}

export default MovieList

const styles = StyleSheet.create({
    container: {
        marginBottom: 32,
        marginVertical: 16,

    },
    title: {
        marginHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    titleText: {
        color: 'white',
        fontSize: 20,
    },
    textTwo: {
        fontSize: 18,
        lineHeight: 28,
        color: theme.text
    },
    movieImageContainer: {
        marginTop: 4,
        marginRight: 16,

    },
    movieImage: {
        borderRadius: 20,
        width: width * 0.33,
        height: height * 0.22
    },
    movieNameText: {
        marginLeft: 4,
        color: '#ffffff',
        textAlign: 'center'
    }
})