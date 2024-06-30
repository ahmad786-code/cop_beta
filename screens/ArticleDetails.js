import React,{useEffect, useState} from 'react'
import { Dimensions, StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity,Image ,ActivityIndicator} from 'react-native'

 
import { Color, FontFamily, FontSize } from '../theme';
import { getFirebaseApp } from '../utils/firebaseHalper';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const { height, width } = Dimensions.get('window');

const ArticleDetails = ({route, navigation }) => {
  const { articleId } = route.params;
  const [article, setArticle] = useState(null);
  console.log(article);

  const formatDateForArticle = (date) => {
    const options = { month: 'short', day: '2-digit' };  // Configuring to show abbreviated month and day
    let dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', options); // Using 'en-US' to get English month names
  };

  useEffect(() => {
    const fetchArticleDetails = async () => {
      const app = getFirebaseApp();
      const db = getFirestore(app);
      const docRef = doc(db, 'articles', articleId);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let articleData = docSnap.data();
        articleData.date = formatDateForArticle(articleData.date);  // Format the date before setting state
        setArticle({ id: docSnap.id, ...articleData });
      } else {
        console.log("No such article!");
      }
    };

    fetchArticleDetails();
  }, [articleId]);

  if (!article) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Color.colorDarkslateblue} style={{ marginVertical: 20 }} />
    </View>;
  }
  return (

    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/img/Design.png')}>
      <ScrollView bounces={false}  showsVerticalScrollIndicator={false}>
       
          <ImageBackground  source={{ uri: article.image }}  resizeMode='cover' imageStyle={{ borderBottomLeftRadius: 42, borderBottomRightRadius: 42, }} style={{ height: height * .60 }}>
            <View style={{ height: height * .60, borderBottomLeftRadius: 42, borderBottomRightRadius: 42, backgroundColor: 'rgba(0, 0, 0, .4)' }}>
          


            </View>
          </ImageBackground>

          <View style={{ paddingHorizontal: 25, bottom: 20 }}>

            <View style={{ backgroundColor: Color.colorDarkslateblue, width: 121, borderRadius: 64, alignItems: 'center', paddingVertical: 7, paddingHorizontal: 14, alignSelf: 'flex-end' }}>
              <Text style={{ color: '#fff', fontFamily: FontFamily.soraSemiBold, fontSize: 14 }}>{article?.name}</Text>

            </View>
          </View>
        
          <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10, paddingHorizontal: 25, marginBottom: 10 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontFamily: FontFamily.soraSemiBold }}>Article Title</Text>
            <Text style={{ color: Color.colorDarkslateblue, fontFamily: FontFamily.soraRegular, fontSize: 15 }}>{article?.date}</Text>
          </View>

          <View style={{ paddingHorizontal: 25 }}>
            <Text style={{ color: Color.colorGray_100, fontFamily: FontFamily.soraRegular, fontSize: 15 , lineHeight: 35 }}>
              {article.description}
            </Text>
 
          </View>

        </ScrollView>
      </ImageBackground>
    </View>

  )
}





export default ArticleDetails
const styles = StyleSheet.create({

})