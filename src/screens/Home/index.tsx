import React, {useState, useCallback } from 'react';
import { FlatList, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { CategorySelect } from '../../components/CategorySelect';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { Appointment, AppointmentProps } from '../../components/Appointment';

import { styles } from './index.styles';
import { COLLECTION_APPOINTMENT } from '../../configs/dataBase';
import { Load } from '../../components/Load';

export function Home() {
  const [category, setCategory] = useState('');
  const [appointment, setAppointment] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  
  function handleCategorySelect(categoryId: string){
    categoryId === category ? setCategory(''): setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps){

    navigation.navigate('AppointmentDetails', {guildSelected});
      
  }
  function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate');
      
  }

  async function LoadingAppointment() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
    const storage: AppointmentProps[] = response?  JSON.parse(response):[];
    if (category){
      setAppointment(storage.filter(item => item.category === category));
    } else {
      setAppointment(storage);
    }
    setLoading(false);

  }

  useFocusEffect(useCallback(() => {
    LoadingAppointment();
  },[category]));
  

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate}/>
      </View>
        <CategorySelect 
          categorySelected={category}
          setCategory ={handleCategorySelect}
        />

      { loading? <Load /> :
      (<>
        <ListHeader 
          title='Partidas Agendadas'
          subtitle={`Total ${appointment.length}`}
        />
        <FlatList
          data={appointment}
          keyExtractor={item => item.id}
          renderItem ={({ item }) => (
            <Appointment 
              data={item}
              onPress={() => handleAppointmentDetails(item)}
            />
            )}
          ItemSeparatorComponent={() => <ListDivider/>}
          contentContainerStyle={{paddingBottom:69}}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
        />
      </>)
      }
    </Background>
  );
}
