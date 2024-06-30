import React, { useState , useEffect} from 'react'
 import {Image} from 'react-native'
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
 
import { Color, Border, FontSize } from '../theme';
import { getFirebaseApp } from '../utils/firebaseHalper';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
  
const CityPicker = ({label, value, onChange}) => {
  const [selectedValue, setSelectedValue] = useState(value || null);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchCities = async () => {
      const app = getFirebaseApp();
      const db = getFirestore(app);
      const citiesCollection = collection(db, 'cities');
      const citySnapshot = await getDocs(citiesCollection);
      const citiesData = citySnapshot.docs.map(doc => ({
        label: doc.data().name,
        value: doc.data().name,
        color: Color.colorGray_100
      }));

      setCities(citiesData);
    };

    fetchCities();
  }, []);

  const handleValueChange = (value) => {
    setSelectedValue(value);
    onChange(value);
  };
  return (
    <RNPickerSelect
      onValueChange={handleValueChange}
      items={cities}
      value={selectedValue}
      useNativeAndroidPickerStyle={true}
      placeholder={{
        label: label || 'Select City',
        value: null,
      }}
      style={{
        ...pickerSelectStyles,
        iconContainer: {
          top: '60%',
          right: 10,
          transform: [{ translateY: -12 }],
        },
      }}
      Icon={() => <Image source={require('../assets/vectors/ChevronDownGray.png')} style={{ width: 10, height: 10 }} />}
    />
  );
}

 
const pickerSelectStyles = {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 12,
      color: Color.colorGray_100,
      paddingRight: 30, 
      backgroundColor:  Color.colorGray_400
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
     
      borderRadius: 8,
      color: Color.colorGray_100,
      paddingRight: 30, 
      backgroundColor:  Color.colorGray_400
    },
  };

export default CityPicker