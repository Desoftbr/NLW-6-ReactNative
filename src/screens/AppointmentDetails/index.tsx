import React, { useState, useEffect }  from 'react';
import { useRoute } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import {
  Text,
  View,
  ImageBackground,
  FlatList,
  Alert,
  Share,
  Platform
} from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './index.styles';
import { api } from '../../services/api';

import { AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider'
import { ListHeader } from '../../components/ListHeader';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { Member, MemberProps } from '../../components/Member';

import bannerImg from '../../assets/banner.png'

type Params = {
  guildSelected: AppointmentProps
}
type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
}

export function AppointmentDetails(){
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);
  const { guildSelected } = useRoute().params as Params;

  
  async function fetchGuildWidget(){
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    } catch {
      Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?');      
    } finally{
      setLoading(false);
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS ==='ios'
    ? `Junte-se a ${guildSelected.guild.name}`
    : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite
    });
  }

  function handleOpenGuild(){
    Linking.openURL(widget.instant_invite);
  }

  useEffect(() =>{
    fetchGuildWidget();
  });

  return(
    <Background>
      <Header title='Detalhes'
        action={
          widget.instant_invite &&
          <BorderlessButton onPress={handleShareInvitation} >
            <Fontisto 
              name="share"
              size={24}
              color= {theme.colors.primary}
            />
          </BorderlessButton>
        }/>
      <ImageBackground 
        source={bannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            { guildSelected.guild.name }
          </Text>
          <Text style={styles.subtitle}>
          {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>

      {loading ? <Load /> :
      <>
        <ListHeader 
          title="Jogadores"
          subtitle={`Total ${widget.members.length}`}
        />
        <FlatList 
          data={widget.members}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>(
            <Member data={item} />
          )}
          ItemSeparatorComponent={() => <ListDivider isCenterd/>}
          style={styles.members}
        />
        {widget.instant_invite &&
        <View style={styles.footer}>
          <ButtonIcon 
            title='Entrar na partida'
            onPress={handleOpenGuild}
          />
        </View>
      
        }
      </>
      }

    </Background>
  )
}