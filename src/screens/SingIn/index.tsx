import React, {useState} from 'react';
import { 
  Text, 
  View, 
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
//import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth'

import IllustrationImg from '../../assets/illustration.png';
import { styles } from './index.styles';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';
import { theme } from '../../global/styles/theme';

export function SignIn() {
  //const navigation = useNavigation();

  const { loading, signIn } = useAuth();
  

  async function handleSignIn(){
    //navigation.navigate('Home');  
    try {
      await signIn();
    } catch (error) {
      Alert.alert(error);
    }
  }

  return (
    <Background>
      <View style={styles.container}>

        <Image 
          source ={IllustrationImg} 
          style={styles.image} 
          resizeMode='stretch'
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}
            e organize suas {'\n'}
            jogatinas {'\n'}
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {'\n'}
            favoritos com seus amigos
          </Text>
          {loading 
          ? < ActivityIndicator color={theme.colors.primary} />
          :
          <ButtonIcon 
            title='Entrar com o Discord' 
            onPress={handleSignIn}
          />
          }
        </View>

      </View>
    </Background>
  );
}
