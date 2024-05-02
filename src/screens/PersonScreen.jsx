import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';


var { width, height } = Dimensions.get('window')

const PersonScreen = () => {

    const [isFavourite, setIsFavourite] = useState(false)
    const navigation = useNavigation()

    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: 'rgb(23,23,23)'
        }}
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

                <View>
                    <View>
                        <Text>Gender</Text>
                        <Text>Male</Text>
                    </View>
                </View>
            </View>

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
})