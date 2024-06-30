import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getFirebaseApp } from '../utils/firebaseHalper';
import { getFirestore, collection, query, onSnapshot, where } from 'firebase/firestore';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import CustomSearch from '../components/CustomSearch';
import { Color, FontFamily, FontSize } from '../theme';
import ArticleCard from '../components/ArticleCard';

import { FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';



const { height, width } = Dimensions.get('window');



const Articles = ({ navigation }) => {
    const [articles, setArticles] = useState([]);
    const [featuredArticles, setFeaturedArticles] = useState([]);
    const [iframeArticles, setIframeArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [filteredFeaturedArticles, setFilteredFeaturedArticles] = useState([]);

    useEffect(() => {
        const app = getFirebaseApp();
        const db = getFirestore(app);

        // Fetching all articles
        const articlesQuery = query(collection(db, 'articles'));
        const unsubscribeArticles = onSnapshot(articlesQuery, (querySnapshot) => {
            const articles = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: formatDateForArticle(doc.data().date), // Utility to format dates
                image: doc.data().image
            }));
            setArticles(articles);
        });

        // Fetching only featured articles
        const featuredQuery = query(collection(db, 'articles'), where('isFeatured', '==', true));
        const unsubscribeFeatured = onSnapshot(featuredQuery, (querySnapshot) => {
            const featured = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                date: formatDate(doc.data().date),
                image: doc.data().image
            }));
            setFeaturedArticles(featured);
        });

        return () => {
            unsubscribeArticles();
            unsubscribeFeatured();
        };
    }, []);

    useEffect(() => {
        const app = getFirebaseApp();
        const db = getFirestore(app);

        // Fetching iframe articles
        const iframeArticlesQuery = query(collection(db, 'iframeArticles'));
        const unsubscribeIframeArticles = onSnapshot(iframeArticlesQuery, (querySnapshot) => {
            const iframeArticles = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setIframeArticles(iframeArticles);
        });

        return () => {
            unsubscribeIframeArticles();
        };
    }, []);


    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'short', year: '2-digit' };
        if (date instanceof Date) {
            return date.toLocaleDateString('en-GB', options);
        } else if (typeof date === 'string') {
            const jsDate = new Date(date);
            return jsDate.toLocaleDateString('en-GB', options);
        }
        return date;
    };

    const formatDateForArticle = (date) => {
        const options = { month: 'short', day: '2-digit' };  // Configuring to show abbreviated month and day
        let dateObj = new Date(date);
        return dateObj.toLocaleDateString('en-US', options); // Using 'en-US' to get English month names
    };

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredArticles(articles);
            setFilteredFeaturedArticles(featuredArticles);
        } else {
            const filtered = articles.filter(article =>
                article.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.date.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredArticles(filtered);

            const filteredFeatured = featuredArticles.filter(article =>
                article.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.date.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredFeaturedArticles(filteredFeatured);
        }
    }, [searchQuery, articles, featuredArticles]);

    const renderArticalItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('Articale_Detail', {
                        articleId: item.id,
                    })
                } style={{ marginHorizontal: 25 }}>
                <ImageBackground source={{ uri: item.image }} style={{ height: 220, width: 250 }} imageStyle={{ borderRadius: 12 }}>

                    <View style={{ justifyContent: 'flex', justifyContent: 'space-between', height: '100%' }}>
                        <View style={{ paddingVertical: 12, paddingHorizontal: 13 }}>
                            <View style={{ width: 86, backgroundColor: Color.colorDarkslateblue, borderRadius: 64, paddingVertical: 5, paddingHorizontal: 11, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontFamily: FontFamily.soraRegular, color: '#fff' }}>{item.date}</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', paddingHorizontal: 23, paddingVertical: 13, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontFamily: FontFamily.soraRegular, lineHeight: 25 }}> {item.description.substring(0, 40)}</Text>
                        </View>
                    </View>

                </ImageBackground>
            </TouchableOpacity>
        );
    };


    return (

        <View style={{ flex: 1, }}>
            <ImageBackground source={require('../assets/img/Design.png')} resizeMode='cover' style={{ flex: 1 }}>

                <SafeAreaView>

                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30, marginBottom: 24 }}>

                    </View>
                </SafeAreaView>
                <View style={{ paddingHorizontal: 25, marginBottom: 24 }}>
                    <CustomSearch placeholder='Search articles' onChangeText={setSearchQuery} />

                </View>

                <ScrollView showsVerticalScrollIndicator={false} bounces={false} >

                    <Text style={{ color: Color.colorWhite, fontSize: 20, fontFamily: FontFamily.soraSemiBold, marginBottom: 10, paddingHorizontal: 25 }}>Featured Articles</Text>


                    <View style={{ paddingHorizontal: 25, marginBottom: 24 }}>
                        <FlatList
                            data={filteredFeaturedArticles}
                            renderItem={renderArticalItem}
                            horizontal
                            keyExtractor={(item) => item.id}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    <Text style={{ color: Color.colorWhite, fontSize: 20, fontFamily: FontFamily.soraSemiBold, marginBottom: 17, paddingHorizontal: 25 }}>Recommended for you</Text>



                    <View style={{ paddingHorizontal: 20 }}>
                        {filteredArticles.map((article) => (
                            <TouchableOpacity onPress={() =>
                                navigation.navigate('Articale_Detail', {
                                    articleId: article.id,
                                })
                            }>
                                <View key={article.id} style={{ flexDirection: 'row', alignItems: 'center', columnGap: 20, marginVertical: 20, }}>

                                    <Image style={{ width: 109, height: 109, borderRadius: 12 }} source={{ uri: article.image }} />

                                    <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', rowGap: 4, width: 200 }}>
                                        <Text style={{ color: '#fff', fontSize: 18, fontFamily: FontFamily.soraRegular }}> {article.name} </Text>
                                        <Text style={{ color: Color.colorGray_100, fontFamily: FontFamily.soraRegular }}> {article.description.substring(0, 20)}</Text>
                                        <Text style={{ color: Color.colorDarkslateblue, fontFamily: FontFamily.soraRegular }}>{article.date}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>


                  
                    <View style={{ paddingHorizontal: 20 }}>
                        {iframeArticles.map((iframe) => (
                            <View key={iframe.id} style={{ marginHorizontal: 25, marginBottom: 20 }}>
                                <WebView
                                    style={{ height: height, width: width * .8 , borderRadius: 12, overflow: 'hidden' }}
                                    originWhitelist={['*']}
                                    source={{ uri: iframe.iframeURL }}
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>


            </ImageBackground>
        </View>



    )
}

export default Articles

const styles = StyleSheet.create({

    item: {
        flexDirection: 'row',
        width: '80%',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: 109,
        height: 109,
        borderRadius: 12,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'column',
        rowGap: 2,
        justifyContent: 'center',
        marginHorizontal: 18
    },
    name: {
        fontSize: 18,
        fontFamily: FontFamily.soraRegular,
        color: 'white',
    },
    description: {
        fontSize: 14,
        color: 'white',
        fontFamily: FontFamily.soraRegular,
    },
    date: {
        fontSize: 12,
        fontFamily: FontFamily.soraRegular,
        color: Color.colorDarkslateblue,
    },
})
