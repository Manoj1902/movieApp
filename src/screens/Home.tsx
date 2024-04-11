import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons';
import { stylesTheme } from '../../theme';

const Home = () => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ marginBottom: 3 }} >
                <StatusBar barStyle={'light-content'} backgroundColor="#262626" />
                <View style={styles.headerCotainer}>
                    <Icon name='menu' size={30} color="white" />

                    <Text style={styles.logo}>
                        <Text style={stylesTheme.text}>M</Text>ovies
                    </Text>

                    <TouchableOpacity>
                        <Icon name='search' size={30} color='white' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}>
                {/* Trending Movies Carousel */}
            </ScrollView>
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
        fontWeight: 'bold'
    }
})