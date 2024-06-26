import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { debounce } from 'lodash'
import { fallbackMoviePoster, image185, searchMovies } from '../../api/moviedb'

var { width, height } = Dimensions.get('window')

const SearchScreen = () => {
    const navigation = useNavigation()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    const movieName = "Pushpa"

    const handleSearch = value => {
        // console.log("value: ", value)
        if (value && value.length > 2) {
            setLoading(true)
            searchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false)
                // console.log("Got Movies: ", data)
                if (data && data.results) setResults(data.results)

            })
        } else {
            setLoading(false)
            setResults([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 0), [])

    return (
        <SafeAreaView style={{ backgroundColor: 'rgb(38, 38, 38);', flex: 1 }}>
            <View style={styles.searchContainer}>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movies'
                    placeholderTextColor={'lightgray'}
                    style={styles.searchInput} />

                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={styles.closeBtn}>
                    <Icon name='close-outline' size={25} color={'white'} />
                </TouchableOpacity>

            </View>

            {/* Results */}
            {
                loading ? (<Loading />) :

                    results.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            style={styles.resultScrollView}>
                            <Text style={styles.resultsText}>Results ({results.length})</Text>
                            <View style={styles.resultViewContainer}>
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.navigate('Movie', item)}>

                                                <View style={styles.searchResultItem}>
                                                    <Image
                                                        // source={require('../images/pushpa.jpg')}
                                                        source={{ uri: image185(item?.poster_path) || fallbackMoviePoster }}
                                                        style={{ width: width * 0.44, height: height * 0.3, borderRadius: 24 }} />
                                                    <Text style={{ color: 'rgb(212, 212, 212)', marginLeft: 4 }}>
                                                        {
                                                            item?.title?.length > 22 ? item?.title?.slice(0, 22) + "..." : item?.title
                                                        }
                                                    </Text>
                                                </View>


                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Image source={require('../images/movietime.png')}
                                style={{ width: 278, height: 300, marginTop: 30 }} />
                        </View>
                    )

            }



        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    searchContainer: {
        marginHorizontal: 16,
        marginBottom: 12,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 9999
    },
    searchInput: {
        paddingLeft: 24,
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
        letterSpacing: 0.024,
    },
    closeBtn: {
        borderRadius: 9999,
        padding: 12,
        margin: 4,
        backgroundColor: 'rgb(115 115 115);'
    },
    resultScrollView: {
        marginVertical: 12
    },
    resultsText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 4
    },
    resultViewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    searchResultItem: {
        marginVertical: 8,
        marginBottom: 4
    }
})