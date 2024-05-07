import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../../api/moviedb';


var { width, height } = Dimensions.get('window')

const PersonScreen = () => {

    const { params: item } = useRoute()
    const [isFavourite, setIsFavourite] = useState(false)
    const [personMovies, setPersonMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [person, setPerson] = useState({})

    const navigation = useNavigation()


    useEffect(() => {
        setLoading(true)
        // console.log("person: ", item)
        getPersonDetails(item.id)
        getPersonMovies(item.id)
    }, [item])


    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id)
        // console.log('Got person Data', data)
        if (data) setPerson(data)
        setLoading(false)
    }

    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id)
        console.log('Got person Movies', data)
        if (data && data.cast) setPersonMovies(data.cast)
    }


    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: 'rgb(23,23,23)'
        }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView style={styles.headerContent}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name='chevron-back' size={30} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                    <Icon name='heart-sharp' size={35} color={isFavourite ? 'red' : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* Person details */}

            {
                loading ? (<Loading />) : (
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            shadowColor: 'gray',
                            shadowRadius: 40,
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 1,
                        }}>
                            <View style={{
                                alignItems: 'center',
                                overflow: 'hidden',
                                height: 288,
                                width: 288,
                                borderRadius: 9999,
                                borderWidth: 2,
                                borderStyle: 'solid',
                                borderColor: 'rgb(115,115,115)'
                            }} >

                                <Image
                                    // source={require('../images/alluarjun.jpg')}
                                    source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                                    style={{ height: height * 0.43, width: width * 0.74 }} />
                            </View>
                        </View>

                        {/* Person Name */}
                        <View style={styles.personNameContainer}>
                            <Text style={styles.personNameText}>
                                {person?.name}
                            </Text>
                            <Text style={styles.personBirthPlaceText}>
                                {person?.place_of_birth}
                            </Text>
                        </View>

                        <View style={styles.personInfoContainer}>
                            <View style={styles.personInfo}>
                                <Text style={styles.personInfoTitle}>Gender</Text>
                                <Text style={styles.personInfoText}>
                                    {person?.gender == 1 ? "Female" : "Male"}
                                </Text>
                            </View>
                            <View style={styles.personInfo}>
                                <Text style={styles.personInfoTitle}>Birthday</Text>
                                <Text style={styles.personInfoText}>{person?.birthday}</Text>
                            </View>
                            <View style={styles.personInfo}>
                                <Text style={styles.personInfoTitle}>Known for</Text>
                                <Text style={styles.personInfoText}>{person?.known_for_department}</Text>
                            </View>
                            <View style={styles.personInfolast}>
                                <Text style={styles.personInfoTitle}>Popularity</Text>
                                <Text style={styles.personInfoText}>{person?.popularity?.toFixed(2)} %</Text>
                            </View>
                        </View>
                        <View style={styles.biographyContainer}>
                            <Text style={styles.biographyTitle}>Biography</Text>
                            <Text style={styles.biographyContent}>
                                {
                                    person?.biography || "NA"
                                }
                            </Text>
                        </View>

                        {/* Persons Movies */}
                        <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />

                    </View>
                )
            }


        </ScrollView>
    )
}

export default PersonScreen

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%'
    },
    headerContent: {
        // position: 'absolute',
        // zIndex: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
        marginVertical: 12
    },
    backButton: {
        borderRadius: 12,
        backgroundColor: theme.background,
        padding: 4
    },
    personNameContainer: {
        marginTop: 24
    },
    personNameText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'

    },
    personBirthPlaceText: {
        fontSize: 16,
        color: 'rgb(115,115,115)',
        textAlign: 'center'
    },
    personInfoContainer: {
        marginHorizontal: 12,
        marginTop: 24,
        padding: 16,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(64, 64, 64)',
        borderRadius: 9999,
    },
    personInfo: {
        borderRightColor: 'rgb(163,163,163)',
        borderRightWidth: 1,
        paddingHorizontal: 18,
        alignItems: 'center',
    },
    personInfolast: {
        paddingHorizontal: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    personInfoTitle: {
        color: 'white',
        fontWeight: 'bold',

    },
    personInfoText: {
        color: 'rgb(212,212,212)',
        fontSize: 14
    },
    biographyContainer: {
        marginTop: 24,
        marginHorizontal: 16,
    },
    biographyTitle: {
        color: 'white',
        fontSize: 18,
        marginBottom: 8
    },
    biographyContent: {
        color: 'rgb(163, 163, 163)',
        letterSpacing: 0.4,
        textAlign: 'justify'
    },
})