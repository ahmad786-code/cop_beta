import React , {useEffect, useState} from 'react'
import { ImageBackground, Pressable, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

import CustomSearch from '../components/CustomSearch'

import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
 

import { FlatList } from 'react-native'
 
import { FontFamily, Color } from '../theme'
import { getFirebaseApp } from '../utils/firebaseHalper'
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy, serverTimestamp, doc, getDoc, where } from 'firebase/firestore';
import { useSelector } from 'react-redux'
 

const Concert = ({ navigation }) => {
  const [concerts, setConcerts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConcerts, setFilteredConcerts] = useState([]);
  const userCity = useSelector(state => state.auth.userData.city);

  useEffect(() => {
    const app = getFirebaseApp();
    const db = getFirestore(app);
    const q = query(collection(db, "concerts"),  where('location', '==', userCity));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const concertsArray = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                id: doc.id,
                date: data.date ? formatDate(data.date) : 'No date' // Safely handling undefined date
            };
        });
        setConcerts(concertsArray);
    });

    return () => unsubscribe();
}, []);

const formatDate = (date) => {
  if (date instanceof Date) {
      const options = { day: '2-digit', month: 'short', year: '2-digit', hour12: false };
      return date.toLocaleDateString('en-GB', options);
  } else if (typeof date === 'string') {
      // Assuming the date is in ISO format, e.g., '2023-05-22'
      const jsDate = new Date(date);
      const options = { day: '2-digit', month: 'short', year: '2-digit', hour12: false };
      return jsDate.toLocaleDateString('en-GB', options);
  }
  return date; // If date is not a recognized format, return it as is
};

useEffect(() => {
  if (searchQuery.trim() === '') {
    setFilteredConcerts(concerts);
  } else {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = concerts.filter(concert =>
      (concert.name && concert.name.toLowerCase().includes(lowerCaseQuery)) ||
      (concert.date && concert.date.toLowerCase().includes(lowerCaseQuery)) ||
      (concert.location && concert.location.toLowerCase().includes(lowerCaseQuery)) ||
      (concert.venue && concert.venue.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredConcerts(filtered);
  }
}, [searchQuery, concerts]);
  

  const renderArticalItem = ({ item }) => {
   
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Concert_Detail', {
            concertId: item.id,
          })
        } style={{marginVertical:20}}>
        <ImageBackground source={{ uri: item.image }} imageStyle={{ borderRadius: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 20, paddingRight: 10, paddingTop: 20, }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: '#fff' }}>{item.name}</Text>
              <View style={{ flexDirection: 'row', columnGap: 4, alignItems: 'center' }}>
                <Image source={require('../assets/img/Location.png')} />
                <Text style={{ color: '#fff' }}>{item.location}</Text>
              </View>
            </View>
            <View style={{ width: 86, backgroundColor: Color.colorDarkslateblue, borderRadius: 64, alignItems: 'center', justifyContent: 'center', paddingVertical: 5, }}>
              <Text style={{ color: '#fff', fontFamily: FontFamily.soraRegular, fontSize: 12 }}> { item.date}</Text>
            </View>
          </View>
          <View style={{ alignSelf: 'flex-end', marginTop: 100, paddingRight: 14 }}>
            <Image source={require('../assets/img/concertIcon.png')} />

          </View>
          <View style={{ backgroundColor: 'rgba(0, 0, 0, .100)', paddingHorizontal: 23, paddingVertical: 13, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 16, fontFamily: FontFamily.soraRegular, lineHeight: 25 }}>{`${item.description.substring(0, 50)}...` }</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground source={require('../assets/img/Design.png')} resizeMode='cover' style={{ flex: 1 ,   }}>
      <SafeAreaView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5, marginBottom: 60 }}>
         
        </View>
      </SafeAreaView>

      <View style={{ paddingHorizontal: 25, marginBottom: 14 }}>
        <CustomSearch placeholder='Search Concert'  onChangeText={setSearchQuery}/>

      </View>

      <View style={{ paddingHorizontal: 25, flex:1 }}>
        <FlatList
        showsVerticalScrollIndicator={false}
          data={filteredConcerts}
          renderItem={renderArticalItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>


    </ImageBackground>
  )
}

export default Concert

const styles = StyleSheet.create({})