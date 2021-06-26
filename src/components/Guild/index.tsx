import React from 'react';
import { Feather } from '@expo/vector-icons';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { GuildIcon } from '../GuildIcon';

export type GuildProps ={
  id:string;
  name:string;
  icon: null | string;
  owner: boolean;
}

type Props = TouchableOpacityProps &{
  data: GuildProps;
} 
export function Guild({data, ...rest}:Props){

  return (
      <TouchableOpacity 
        style={styles.container}
        activeOpacity={0.7}
        {...rest}>
        <View style={{marginRight:20}}>
          <GuildIcon guildsId={data.id} iconId={data.icon}/>
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {data.name}
            </Text>
            <Text style={styles.type}>
              {data.owner? 'Admninistrador': 'Convidado'}
            </Text>
          </View>
          <Feather
            name='chevron-right'
            color= {theme.colors.heading}
            size={24}
          />
        </View>
      </TouchableOpacity>
  )
}