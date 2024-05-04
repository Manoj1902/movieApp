import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';


var { width, height } = Dimensions.get('window')

const PersonScreen = () => {

    const [isFavourite, setIsFavourite] = useState(false)
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5])
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

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
                                borderWidth: 1,
                                borderStyle: 'solid',
                                borderColor: 'rgb(115,115,115)'
                            }} >

                                <Image source={require('../images/alluarjun.jpg')}
                                    style={{ height: height * 0.43, width: width * 0.74 }} />
                            </View>
                        </View>

                        {/* Person Name */}
                        <View style={styles.personNameContainer}>
                            <Text style={styles.personNameText}>
                                Allu Arjun
                            </Text>
                            <Text style={styles.personBirthPlaceText}>
                                Chennai, Tamil Nadu
                            </Text>
                        </View>

                        <View style={styles.personInfoContainer}>
                            <View style={styles.personInfo}>
                                <Text style={styles.personInfoTitle}>Gender</Text>
                                <Text style={styles.personInfoText}>Male</Text>
                            </View>
                            <View style={styles.personInfo}>
                                <Text style={styles.personInfoTitle}>Birthday</Text>
                                <Text style={styles.personInfoText}>19 Jul, 1996</Text>
                            </View>
                            <View style={styles.personInfo}>
                                <Text style={styles.personInfoTitle}>Known for</Text>
                                <Text style={styles.personInfoText}>Acting</Text>
                            </View>
                            <View style={styles.personInfolast}>
                                <Text style={styles.personInfoTitle}>Popularity</Text>
                                <Text style={styles.personInfoText}>80.0</Text>
                            </View>
                        </View>
                        <View style={styles.biographyContainer}>
                            <Text style={styles.biographyTitle}>Biography</Text>
                            <Text style={styles.biographyContent}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique sint ut corporis ipsam provident assumenda ab voluptatum ipsum nobis inventore recusandae, ad praesentium facere laudantium commodi sequi, exercitationem nemo a dolorem pariatur officiis, eos asperiores sed. Saepe, fuga? Eum et perspiciatis dolore odio atque expedita nulla, amet tempora est omnis dolorem nisi at consequatur optio natus neque, rerum, mollitia earum hic nam delectus eius voluptas ipsa! Quidem, aspernatur. Ullam, illum. Repudiandae repellendus molestias assumenda dolorum molestiae possimus sunt fugiat eveniet magnam voluptas illum esse odio enim ea nihil facilis, labore error incidunt culpa ab placeat. Perferendis placeat deserunt veritatis nulla harum excepturi eveniet, magni nihil id officia voluptates numquam nam at quibusdam nesciunt blanditiis maiores adipisci sapiente quisquam cumque odio assumenda dicta quia. Ipsum vitae delectus repellendus, odio iusto, autem assumenda saepe doloremque, eaque minima maxime culpa. Sequi commodi aspernatur corporis in iste quas architecto odio totam, tempora repudiandae porro saepe cumque necessitatibus quaerat eveniet numquam molestiae voluptatibus recusandae quibusdam hic debitis omnis reprehenderit maiores tenetur. Veritatis vitae aperiam sed aspernatur nihil perspiciatis molestias consequatur voluptate, recusandae fugit facere animi aliquid voluptatem inventore doloremque iure repellendus praesentium delectus fugiat! Veniam, nisi quisquam magnam neque expedita fugiat distinctio magni animi placeat.</Text>
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
        backgroundColor: '#EAB308',
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