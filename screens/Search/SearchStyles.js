import {StyleSheet, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';


const SearchStyles = () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('window').height+statusBarHeight ;

  const width = percentage => {
    return (screenWidth * percentage) / 100;
  };
  const height = percentage => {
    return (screenHeight * percentage) / 100;
  };

  const totalSize = percentage => {
    return (
      Math.sqrt(screenHeight * screenHeight + screenWidth * screenWidth) *
      (percentage / 100)
    );
  };
  const styles = StyleSheet.create({
    container: {
      width:width(100),
      height:height(100),
      alignItems: 'center',
      justifyContent: 'center',
    },
    p1: {
      width: width(100),
      height: height(100),
      resizeMode: 'cover',
      alignItems: 'center',
    },
    s_v:{
        width: width(80),
        height: height(5),
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth:width(0.5),
        borderColor:'white',
        borderRadius:40,
        paddingRight:width(5),
        // position:'absolute',
        top:statusBarHeight+height(20),
        display:'flex',
        flexDirection:'row'
    },
    intput:{
        width: width(70),
        height: height(5),
        paddingLeft:width(5),
        fontSize:totalSize(1.6),
        color:'white',
    },
    search:{
        width:width(5),
        height:height(3),
        resizeMode:'contain',
    },
    flt_list: {
      position: 'absolute',
      top: statusBarHeight + height(25),
      width: width(75),
      paddingHorizontal: width(5),
      borderRadius: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    sug:{
      fontSize:totalSize(1.6),
      color:'white',
      margin:height(0.5)
    }

});

return styles;
};
export default SearchStyles;