import {StyleSheet, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';


const dmns = () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

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
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
    },
    v1: {
      width: width(100),
      height: height(45),
      alignItems: 'center',
      borderBottomStartRadius: 40,
      borderBottomEndRadius: 40,
    },
    p1: {
      width: width(100),
      height: height(45),
      resizeMode: 'contain',
    },
    cntr: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    loc_search: {
      width: width(92),
      height: height(5),
      marginTop: statusBarHeight + height(2),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    loc: {
      width: width(70),
      fontSize: totalSize(1.8),
      color: 'white',
      lineHeight: totalSize(3),
    },
    search: {
      width: width(7.5),
      height: height(3.8),
      resizeMode: 'contain',
    },
    tempCloud_v: {
      width: width(95),
      height: height(28),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    TempView: {
      position: 'relative',
      width: width(60),
    },
    temp: {
      fontSize: totalSize(10),
      color: 'white',
      lineHeight: totalSize(24),
      marginLeft: width(3),
      letterSpacing:-7
    },
    feels: {
      top: height(15.8),
      fontSize: totalSize(1.5),
      color: 'white',
      letterSpacing:0

    },
    weatherImg: {
      width: width(17),
      height: height(20),
      resizeMode: 'contain',
      marginRight: width(3),
    },
    weather_type: {
      position: 'absolute',
      top: height(15.5),
      right: width(5),
      fontSize: totalSize(1.9),
      color: 'white',
    },
    end_v: {
      width: width(95),
      height: height(6.5),
      borderBottomStartRadius: 30,
      borderBottomEndRadius: 30,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    date_text: {
      fontSize: totalSize(1.6),
      color: 'white',
      paddingLeft: width(2),
      paddingBottom: height(-3),
      justifyContent:'space-between',
      alignSelf: 'center',     
    },
    d_n_t: {
      fontSize: totalSize(1.6),
      color: 'white',
      right: width(1.8),
    },
    down_container: {
      width: width(100),
      alignItems: 'center',
    },
    day_btns: {
      width: width(98),
      height: height(7),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    btn: {
      width: width(28),
      height: height(4.5),
      backgroundColor: '#FFF',
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.05,
      shadowRadius: 1,
      elevation: 5,
    },
    btnActive: {
      width: width(28),
      height: height(4.5),
      backgroundColor: 'rgba(208, 188, 255, 0.7)',
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',

    },
    checking:{
      width: width(28),
      height: height(4.5),
      backgroundColor: '#FFF',
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',

    },
    days_txt: {
      fontSize: totalSize(1.5),
      color: '#0c0a09',
    },
    info_wrpper: {
      width: width(97),
      height: height(19),
      justifyContent: 'space-between',
    },
    info_v: {
      width: width(97),
      height: height(9),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    info_v1: {
      width: width(46.5),
      height: height(9),
      backgroundColor: 'rgba(208, 188, 255, 0.1)',
      borderRadius: 22,
      display:'flex',
      flexDirection:'row',
      
    },
    info_ico: {
      width: width(10.5),
      height: height(9),
      alignItems: 'center',
      justifyContent: 'center',
    },
    ico_v: {
      width: width(8),
      height: width(8),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 100,
    },
    ico: {
      width: width(5),
      height: width(5),
      resizeMode: 'contain',
      borderRadius: 100,
    },
    ico_wind: {
      width: width(8.5),
      height: width(8.5),
      resizeMode: 'contain',
      borderRadius: 130,
    },
    info_det:{
      width:width(23),
      height:height(9),
      justifyContent:'center',
    },
    info_txt:{
      fontSize:totalSize(1.5),
      color:'black',
      padding:width(1)
    },
    info_end:{
      width:width(13),
      height:height(9),
      display:'flex',
      flexDirection:'row',
      marginTop:height(5.4)
    },
    arrow:{
      width:width(6),
      height:width(8),
      resizeMode:'contain',
      marginLeft:width(-3)
    },
    info_end_txt:{
      fontSize:totalSize(1),
      color:'black',
      fontWeight:'bold',
      lineHeight:totalSize(3),
      marginLeft:width(-1)
    },
    hourly_v: {
      width: width(95),
      height: height(21),
      backgroundColor:'rgba(208, 188, 255, 0.1)',
      borderRadius: 22,
      marginTop:height(1),
      alignItems:'center',
      marginBottom:height(1),
    },
    hour_highlight: {
      width: width(94),
      height: height(6.5),
      display:'flex',
      flexDirection:'row',
      alignItems:'center'
    },
    hour_img:{
      width: width(8.5),
      height: width(8.5),
      resizeMode:'contain',
      borderRadius: 100,
      marginLeft:width(1),
    },
    hour_highlight_txt: {
      fontSize:totalSize(1.8),
      color:'black',
      marginLeft:width(2),
    },
    hour_v_container:{
      width: width(94),
      height: height(13.4),
      justifyContent:'space-around',
      display:'flex',
      flexDirection:'row',
    },
    hour1_v:{
      width: width(16),
      height: height(13.4),
      // marginLeft:width(2),
      alignItems:'center',
      justifyContent:'space-around',
    },
    h_high:{
      fontSize:totalSize(1.8),
      color:'black'
    },
    h_img:{
      width: width(11),
      height:width(10),
      resizeMode:'contain'
    },
    h_dsc:{
      fontSize:totalSize(1.8),
      color:'black',
    },
    ampm:{
      fontSize:totalSize(1.3),
      color:'black',
      marginLeft:width(-1)
    },
    det_card: {
      width: width(95),
      height: height(10),
      backgroundColor:'rgba(208, 188, 255, 0.1)',
      borderRadius: 22,
      marginTop:height(1),
      display:'flex',
      flexDirection:'row',
    }, 
    det_v1:{
      width: width(61),
      height: height(10),
      justifyContent:'center',
      paddingLeft:width(4)
    },
    det_dsc:{
      fontSize:totalSize(1.5),
      color:'rgba(73, 70, 73, 1)',
      paddingTop:width(1)
    },
    det_temp:{
      width: width(10),
      height: height(10),
      justifyContent:'center',
    },
    det_temp_txt:{
      fontSize:totalSize(1.7),
      color:'black',
      textAlign:'right',
      paddingTop:width(0.4)
    },
    line_v:{
      width: width(5),
      height: height(10),
      marginTop:height(0.7),
      alignItems:'flex-end'

    },
    line:{
      width:width(2),
      height:height(7),
      resizeMode:'contain',
      opacity:0.8,
    },
    det_img_v:{
      width: width(19),
      height: height(10),
      justifyContent:'center',
      display:'flex',
      flexDirection:'row',
      alignItems: 'center',
    },
    det_img:{
      width:width(12),
      height:width(12),
      resizeMode:'contain',
    }  
  });
  return styles;
};
export default dmns;
