import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, View, Text, FlatList, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'

import { FontSize, Color, FontFamily } from '../theme'

import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirebaseApp } from '../utils/firebaseHalper'
import {getFirestore, collection, query, where, limit, getDocs, onSnapshot  } from 'firebase/firestore';
import { useSelector } from 'react-redux';




 
const { height, width } = Dimensions.get('window');

const Home = ({ navigation }) => {
  
  const [featuredConcerts, setFeaturedConcerts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const userCity = useSelector(state => state.auth.userData?.city);
 

useEffect(() => {
  const fetchFeaturedConcerts = async () => {
    const app = getFirebaseApp();
    const db = getFirestore(app);

    const q = query(collection(db, 'concerts'), where('featured', '==', true), where('location', '==', userCity), limit(3));
    const querySnapshot = await getDocs(q);
    const concerts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: formatDate(doc.data().date), // Apply formatDate here
      uri: doc.data().image
    }));
    setFeaturedConcerts(concerts);
  };

  fetchFeaturedConcerts();
}, []);

 
useEffect(() => {
  const app = getFirebaseApp();
  const db = getFirestore(app);
  const articlesQuery = query(collection(db, 'articles'), limit(10));
  const unsubscribeArticles = onSnapshot(articlesQuery, (querySnapshot) => {
      const articles = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: formatDateForArticle(doc.data().date),
          uri: doc.data().image
      }));
      setArticles(articles);
  });

  return () => unsubscribeArticles();
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


  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/img/Design.png')} resizeMode='cover' style={{ flex: 1 }}>
        <SafeAreaView bounces={false}  >
        
          <View style={{ paddingHorizontal: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 60 }}>
            
          </View>
        </SafeAreaView>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ width: width }}>
            <ScrollView
              style={{ height: height * '.25', }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              onScroll={e => {
                const x = e.nativeEvent.contentOffset.x;
                setCurrentIndex((x / width).toFixed(0));
              }}
              pagingEnabled={true}
              scrollEventThrottle={16}
            >
              {featuredConcerts?.map((item, index) => (

                <TouchableOpacity  key={item.id}  onPress={() => navigation.navigate('Concert_Detail', { concertId: item.id })} style={{ width: width, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 25 }}>

                  <ImageBackground
                    source={{ uri: item.uri }}
                    style={styles.imageBackground}
                    imageStyle={styles.image}
                  >


                    <Text style={{ position: 'absolute', top: 19, left: 20, backgroundColor: '#783F8E', height: 31, width: 121, lineHeight: 31, textAlign: 'center', borderRadius: 64, fontSize: 14, fontFamily: FontFamily.soraSemiBold, color: '#fff' }}>   {(index + 1).toString().padStart(2, '0')}# Trending</Text>

                    <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
                      <Text style={{ color: 'white', fontSize: 16, fontFamily: FontFamily.soraRegular }}>{item.date}</Text>
                      <Text style={{ color: 'white', fontSize: 16, fontFamily: FontFamily.soraRegular }}>{item.location}</Text>

                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center', top: 23, marginBottom: 23 }}>
              {featuredConcerts.map((item, index) => (
                <View key={item.index} style={
                  {

                    width: currentIndex == index ? 20 : 10,
                    height: 8,
                    borderRadius: 50,
                    marginLeft: 5,
                    backgroundColor: currentIndex == index ? '#783F8E' : '#783F8E'
                  }
                }
                />
              ))}
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 25, marginTop: 23, marginBottom: 17 }}>
            <Text style={{ color: Color.colorWhite, fontSize: 20, fontFamily: FontFamily.soraSemiBold }}>Articles</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Articale')}>
              <Text style={{ color: Color.colorDarkslateblue, fontSize: 16, fontFamily: FontFamily.soraSemiBold }}>View more</Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            {articles.map((article) => (
              <TouchableOpacity  onPress={() =>
                navigation.navigate('Concert_Detail', {
                  concertId: article.id,
                })} key={article.id} style={{ flexDirection: 'row', alignItems: 'center',   columnGap: 20 , marginVertical: 20,  }}>
                <Image style={{ width: 109, height: 109, borderRadius: 12 }}  source={{ uri: article.uri }} />

                <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', rowGap: 4, width: 200}}>
                  <Text style={{ color: '#fff', fontSize: 18, fontFamily:FontFamily.soraRegular }}> {article.name}</Text>
                  <Text style={{ color: Color.colorGray_100, fontFamily:FontFamily.soraRegular }}> {article.description.substring(0, 25)}</Text>
                  <Text style={{ color: Color.colorDarkslateblue ,fontFamily:FontFamily.soraRegular}}>{article.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({

  imageBackground: {
    width: '100%',
    height: '100%',

  },
  image: {
    borderRadius: 20,
  },
  articlesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 17,
    paddingHorizontal: 25
  },
  articles: {
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xl,
  },
  viewMore: {

    color: Color.colorDarkslateblue,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.soraSemiBold,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  articlesParent: {
    top: 23,
    flexDirection: "row",
    paddingHorizontal: 25,
    zIndex: 1
  },

  oTracedIcon: {
    width: 24,
    height: 26,
  },
  home1: {
    marginLeft: 139,
    fontSize: FontSize.size_xl,
    textAlign: "center",
    textTransform: "capitalize",
  },
  vectorIcon: {
    width: 16,
    height: 16,
    marginLeft: 139,
  },
  oTracedParent: {
    top: 59,
    flexDirection: "row",
  },
})

export default Home