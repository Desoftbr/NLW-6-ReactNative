import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgProps } from 'react-native-svg';
import { Text,View } from 'react-native';


import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type Props = RectButtonProps &{
  title: string;
  icon: React.FC<SvgProps>;
  checked?:boolean;
  hasCheckBox?:boolean;
  }

export function Category({
  title,
  icon: Icon,
  checked = true,
  hasCheckBox=false,
  ...rest
}: Props){
  const{ secondary40, secondary50, secondary70, secondary75 } = theme.colors;
  return (
      <RectButton {...rest}>
        <LinearGradient
          style={styles.container}
          colors={[secondary50, secondary70]}>
           <LinearGradient 
           style={[styles.content,{ opacity:!hasCheckBox?1:checked?1:0.4 }]}
           colors={[checked ? secondary75: secondary50,secondary40]}
           >
              { hasCheckBox &&
              <View style={checked ? styles.checked: styles.check}/>
              }
              
              <Icon width= {48} height={48} />

              <Text style={styles.title}>
                {title}
              </Text>
           </LinearGradient>

        </LinearGradient>

      </RectButton>
  )
}