import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Cast({ cast, navigation }) {
    let personName = 'Allu Arjun'
    let characterName = 'Pushpa'
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>

                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Person", person)}
                                key={index}
                                style={{ marginRight: 16, alignItems: 'center' }}>
                                <View style={styles.castImageContainer}>
                                    <Image
                                        source={require('../images/alluarjun.jpg')} style={styles.castImage} />
                                </View>
                                <Text style={{ fontSize: 20, color: 'white', marginTop: 4 }}>
                                    {
                                        characterName.length > 10 ? characterName.slice(0, 10) + "..." : characterName
                                    }
                                </Text>
                                <Text style={{ fontSize: 16, color: 'rgb(163,163,163)', marginTop: 4 }}>
                                    {
                                        personName.length > 10 ? personName.slice(0, 10) + "..." : personName
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 18,
    },
    title: {
        color: 'white',
        fontSize: 28,
        marginHorizontal: 16,
    },
    castImageContainer: {
        overflow: 'hidden',
        borderRadius: 50,
        height: 80,
        width: 80,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgb(115,115,115)'
    },
    castImage: {
        height: 96,
        width: 80,
        borderRadius: 16
    }
})