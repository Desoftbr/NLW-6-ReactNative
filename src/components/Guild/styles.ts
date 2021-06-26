import { Inter_100Thin } from '@expo-google-fonts/inter';
import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    flexDirection:'row',
    alignSelf:'center',
    paddingHorizontal:24,
  },
  content:{
    flex: 1,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center'

  },
  header: {
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title:{
    fontFamily:theme.fonts.title700,
    color: theme.colors.heading,
    fontSize:18,
    marginBottom:4,
  },
  type:{
    fontFamily:theme.fonts.text400 ,
    color: theme.colors.highlight ,
    fontSize:13,
    marginRight:12
  },
  

});