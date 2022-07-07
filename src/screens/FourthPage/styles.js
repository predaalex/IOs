import reactDom from 'react-dom';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    tinyLogo: {
        width: 200,
        height: 200,
    },

    container: { 
      flex: 1, 
      padding: 16, 
      paddingTop: 30, 
      backgroundColor: '#fff' 
    },

    head: { 
      height: 40,
      backgroundColor: '#f1f8ff' 
    },

    text: {
      margin: 6
    },

    title: {
      alignSelf: 'center',
      fontSize: 23
    },

    tot: {
      paddingTop:25
    }
})