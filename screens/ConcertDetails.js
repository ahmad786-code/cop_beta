import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, Image, useWindowDimensions, ActivityIndicator } from 'react-native'


import { Color, FontFamily, FontSize } from '../theme';

import SubmitButton from '../components/SubmitButton';
import { getFirebaseApp } from '../utils/firebaseHalper'
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ConcertDetails = ({ route, navigation }) => {
  const { concertId } = route.params;
  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [textShown, setTextShown] = useState(false);
  const { height } = useWindowDimensions()


  useEffect(() => {
    const fetchConcertDetails = async () => {
      const app = getFirebaseApp();
      const db = getFirestore(app);
      const docRef = doc(db, "concerts", concertId);

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setConcert({
            ...data,
            id: docSnap.id,
            date: formatDate(data.date)  // Apply the formatDate function here
          });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
      setLoading(false);
    };

    fetchConcertDetails();
  }, [concertId]);

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


  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Color.colorDarkslateblue} style={{ marginVertical: 20 }} />
    </View>;
  }

  if (!concert) {
       return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={Color.colorDarkslateblue} style={{ marginVertical: 20 }} />
    </View>;
  }

  return (
    <>

      <ImageBackground source={require('../assets/img/Design.png')} resizeMode='cover' style={{ flex: 1 }}>

        <ScrollView showsVerticalScrollIndicator={false}>

          <ImageBackground source={{ uri: concert.image }} resizeMode='cover' style={{ width: '100%', height: height * .4, overflow: 'hidden', borderBottomEndRadius: 42, borderBottomStartRadius: 42 }}>

            <View style={styles.overlay} >

            </View>
          </ImageBackground>
          <View style={{ alignItems: 'flex-end', marginRight: 25, marginTop: -20 }}>
            <View style={{ backgroundColor: Color.colorDarkslateblue, width: 121, height: 31, borderRadius: 64, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontSize: FontSize.size_sm, }}>{concert.name}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'column', marginHorizontal: 20 }}>
            <View style={styles.concertConatiner}>
              <View style={styles.concertBox}>
                <View style={styles.concertDate}>
                  <Text style={styles.title}>Date</Text>
                  <Text style={styles.subTitle}>{concert.date}</Text>
                </View>
              </View>
              <View style={styles.concertBox}>
                <View style={styles}>
                  <Text style={styles.title}>City</Text>
                  <Text style={styles.subTitle}>{concert.location}</Text>
                </View>
              </View>
              <View style={styles.concertBox}>
                <View style={styles.concertDate}>
                  <Text style={styles.title}>Venue</Text>
                  <Text style={styles.subTitle}>{concert.venue}</Text>
                </View>
              </View>
            </View>

            <View style={styles.aboutContainer}>
              <Text style={styles.aboutTitle}>About</Text>
              <View style={styles.textContainer}>

                <Text style={styles.aboutContent} numberOfLines={textShown ? undefined : 3}>{concert.description}</Text>
                <TouchableOpacity onPress={() => setTextShown(!textShown)}>
                  <Text style={styles.readMore}>
                    {textShown ? 'See less' : 'See more'}
                  </Text>
                </TouchableOpacity>

              </View>
            </View>


            <Text style={{ color: '#fff', fontSize: 20, marginBottom: 6 }}>Eentry conditions</Text>
            <View style={{ flexDirection: 'column', rowGap: 5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                <View style={{ width: 5, height: 5, backgroundColor: Color.colorGray_100 }} />
                <Text style={{ color: Color.colorGray_100, fontSize: FontSize.size_base }}>500 places available</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                <View style={{ width: 5, height: 5, backgroundColor: Color.colorGray_100 }} />
                <Text style={{ color: Color.colorGray_100, fontSize: FontSize.size_base }}>500 places available</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                <View style={{ width: 5, height: 5, backgroundColor: Color.colorGray_100 }} />
                <Text style={{ color: Color.colorGray_100, fontSize: FontSize.size_base }}>500 places available</Text>
              </View>

            </View>

          </View>

          <View style={{ alignItems: 'center', flex: 1, marginVertical: 10, }}>
            <SubmitButton title='Participate' onPress={() => navigation.navigate('Participate', { concertId })} />

          </View>
        </ScrollView>


      </ImageBackground>
    </>
  )
}





export default ConcertDetails
const styles = StyleSheet.create({
  overlay: {

    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  concertConatiner: {
    marginTop: 48,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 10
  },
  concertBox: {

    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7,
    padding: 12


  },
  aboutContainer: {
    marginBottom: 22
  },
  title: {
    color: Color.colorWhite
  },
  subTitle: {
    color: Color.colorDarkslateblue,

  },

  aboutTitle: {
    marginBottom: 6,
    fontSize: FontSize.size_xl,
    color: Color.colorWhite
  },

  aboutContent: {
    fontSize: FontSize.size_base,
    color: Color.colorGray_100,
  },
  readMore: {
    color: Color.colorDarkslateblue,
    fontSize: FontSize.size_base
  }
})