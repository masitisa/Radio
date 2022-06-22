import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView , TouchableOpacity, FontAwesome, Image } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign, Ionicons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

export default function App(Station, setStation) {
  const Radio = {
    filename: 'Harvest FM',
    uri: 'http://node-08.zeno.fm/v0myu53ae3quv?zs=Qyh0r6OsRQ2IvATq1GO7Xw&zs=iJCqf_4VRoyHYF3Kw_5ZMw&rj-tok=AAABgXq4nFoAX6smAN5esSnQng&rj-ttl=5',

    filename: 'Moafrika FM',
    uri: "http://onlineradiobox.com/ls/moafrika/player/?cs=ls.moafrika&played=1",

    

    filename: "People's Choice Radio",
    uri: 'http://102.130.114.208:8000/pcfm',
  };
  const Stations = [
    {
      name: 'Harvest fm',
      wave: 86.5,
      uri: 'http://node-08.zeno.fm/v0myu53ae3quv?zs=Qyh0r6OsRQ2IvATq1GO7Xw&zs=iJCqf_4VRoyHYF3Kw_5ZMw&rj-tok=AAABgXq4nFoAX6smAN5esSnQng&rj-ttl=5',
    },
    {
      name: 'Voice of God',
      wave: 86.5,
      uri: 'https://voiceofgodfm.co.ls/',
    },
    {
      name: 'Moafrika fm',
      wave: '86.5',
      uri: 'http://ca3.rcast.net:8040/;stream.mp3',
    },
    {
      name: 'Tsenolo fm',
      wave: 86.5,
      uri: 'http://onlineradiobox.com/ls/tsenolo/player/?cs=ls.tsenolo&played=1',
    },
    {
      name: "People's Choice Radio",
      wave: 86.5,
      uri: 'http://102.130.114.208:8000/pcfm',
    },
    {
      name: 'Radio Maria',
      uri: 'https://worldradiomap.com/ls/play/maria',
      wave: '103.3 MHz'
    }
   
   
  ];
  const [sound, setSound] = React.useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playbackInstance, setPlybackInstance] = useState(null)
  const [play,setplay] = useState(0)
  let [number, setnumber] = useState(0)

  function async() {
    setCurrentIndex(currentIndex + 1)
    setStation(Station - 1)
  }

  const componentDidMount = async () => {marginT
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })

      this.loadAudio()
    } catch (e) {
      console.log(e)
    }
  }


  const handlePreviousTrack = async () => {
    const {isLoaded} = await React.useContext.playbackObject.getStatusAsync();
    const isFirstAudio = context.currentAudioIndex <=0
    let audio =  context.audioFiles[context.currentAudioIndex - 1 ];
    let index;
    let status;
    
    if( !isLoaded && !isFirstAudio){
      index = context.currentAudioIndex - 1
      status = await play(context.playbackObject, audio.uri);
    }

    if( isLoaded && !isFirstAudio){
      index = context.currentAudioIndex - 1
      status = await playNext(context.playbackObject, audio.uri);
    }

    if(isFirstAudio){
      index =context.totalAudioCount - 1;
      audio = context.audioFiles[index];
      if(isLoaded){
        status = await playNext(context.playbackObject, audio.uri);
      }else{
        status = await play(context.playbackObject, audio.uri);
      }
    }

    context.updateState(context, {
      currentAudio : audio, 
      playbackObject : context.playbackObject, 
      soundObj: status, 
      isPlaying: true, 
      setCurrentIndex: index
    });
    storeAudioForNextOpening(audio, index);
  };


  const handleNextTrack = async () => {
    const {isLoaded} = await React.useContext.playbackObject.getStatusAsync();
    const isLastAudio = context.currentAudioIndex + 1 === context.totalAudioCount;
    let audio =  context.audioFiles[context.currentAudioIndex + 1 ];
    let index;
    let status;
    
    if( !isLoaded && !isLastAudio){
      index = context.currentAudioIndex + 1
      status = await play(context.playbackObject, audio.uri);
    }

    if( isLoaded && !isLastAudio){
      index = context.currentAudioIndex + 1
      status = await playNext(context.playbackObject, audio.uri);
    }

    if(isLastAudio){
      index =0;
      audio = context.audioFiles[index];
      if(isLoaded){
        status = await playNext(context.playbackObject, audio.uri);
      }else{
        status = await play(context.playbackObject, audio.uri);
      }
    }

    context.updateState(context, {
      currentAudio : audio, 
      playbackObject : context.playbackObject, 
      soundObj: status, 
      isPlaying: true, 
      setCurrentIndex: index
    });
    storeAudioForNextOpening(audio, index);
  };

  useEffect(() => {
    if (playbackObject === null) {
      setPlaybackObject(new Audio.Sound());
    }
  }, []);

  const handleAudioPlayPause = async () => {
    if (playbackObject !== null && playbackStatus === null) {
      const status = await playbackObject.loadAsync(
        { uri: Radio.uri },
        { shouldPlay: true }
      );
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }

    if (playbackStatus.isPlaying) {
      const status = await playbackObject.pauseAsync();
      setIsPlaying(false);
      return setPlaybackStatus(status);
    }


    if (!playbackStatus.isPlaying) {
      const status = await playbackObject.playAsync();
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }
  };
function change(){}

  React.useEffect(() => {
    return sound
      ? () => {
        //console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <View style={styles.mainbar}>
        <TouchableOpacity>
          <AntDesign name="left" size={24} style={{marginLeft:50}} color="white" />
        </TouchableOpacity>
          <Text style={styles.now_playing_text}> Now Playing </Text>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} style={{marginRight:50}} color="white" />
        </TouchableOpacity>
      </View>

        <View style={styles.music_logo_view}>
          <Image source={require("./assets/bars1.jpg")} style={styles.image_view}/>
        </View>

        <View style={styles.name_of_song_View} >
          <Text style={styles.name_of_song_Text1}>{Stations[number].name}</Text>
          <Text style={styles.name_of_song_Text2}>98.9 MHz</Text>
        </View>

        <View style={styles.icons}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <View style={{ marginLeft: 20 }}>
                <TouchableOpacity onPress={handlePreviousTrack}>
                  <AntDesign name="stepbackward" size={37} color="red" backgroundColor='yellow' />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <View>
                <TouchableOpacity>
                <Ionicons 
                  style={{ alignSelf: 'center', backgroundColor: 'yellow', padding: 10, borderRadius: 20, }} 
                  name={isPlaying ? 'pause' : 'play'} size={18} color='red' 
                  onPress={handleAudioPlayPause}/>
                  </TouchableOpacity>
              </View>
            </View>

            <View>
              <View style={{ marginRight: 20 }}>
                <TouchableOpacity onPress={handleNextTrack}>
                  <AntDesign name="stepforward" size={37} color="red" />
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>

        <View style={styles.recently_played_view}>
          <Text style={styles.recently_played_text}> All Radio Stations </Text>
          < ScrollView>
          <View style={styles.recently_played_list} onPress={change}>
            <Image source={require("./assets/bars1.jpg")} style={styles.recently_played_image} />
             <View style={styles.recently_played_list_text}>
                <Text style={styles.recently_played_list_text1}> Harvest FM </Text>
                <Text style={styles.recently_played_list_text2}> 98.9 MHz </Text>
             </View>
          </View>

          <View style={styles.recently_played_list}>
            <Image source={require("./assets/bars1.jpg")} style={styles.recently_played_image} />
             <View style={styles.recently_played_list_text}>
                <Text style={styles.recently_played_list_text1}> Moafrika FM </Text>
                <Text style={styles.recently_played_list_text2}> 90.7 MHz </Text>
             </View>
          </View>

          
          { Stations.map((station, name)=>(
          <View key={name}>
            <TouchableOpacity >
            <View style={styles.recently_played_list}  >
            <Image source={require("./assets/bars1.jpg")} style={styles.recently_played_image} />
              <Text style={styles.recently_played_list_text1} name={isPlaying ? 'pause' : 'play'} onPress={() => setnumber(number = station.findIndex(e => e.name == station.name))}>{station.name}</Text>
              <Text>{station.wave}</Text>
            </View>

            </TouchableOpacity>
          </View>)
        )}
          </ScrollView>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex:1,
    //justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
  },
  icons: {
    width: '100%',
    height: '6%',
    flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: 'center',
    marginTop: 10,
   // backgroundColor: 'black'
  },
  mainbar:{
    marginTop: 10,
    height:"10%",
    width:"100%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent: 'space-between'
    
  },
  now_playing_text:{
    fontSize:19,
    //marginLeft:10,
    color: "white" ,
    fontWeight: "bold"
  },
  music_logo_view:{
    height:"30%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
  },
  image_view:{
    height:"100%",
    width:"70%",
    borderRadius:10
  },
  name_of_song_View:{
    height:"8%",
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
   // backgroundColor: "black"
  },
  name_of_song_Text1:{
    fontSize:19,
    fontWeight:"500",
    marginTop: 10,
    color: "white"

  },
  name_of_song_Text2:{
    color:"white",
    marginTop:10,
  },
  recently_played_view:{
    height:"43%",
    width:"100%",
  },
  recently_played_text:{
    fontWeight:"bold",
    fontSize:20,
    color:"white",
    marginLeft:20,
    marginTop:40
  },
  recently_played_list:{
    backgroundColor:"black",
    height:100,
    width:"90%",
    borderRadius:10,
    marginLeft:20,
    marginTop:15,
    alignItems:"center",
    flexDirection:"row"
  },
  recently_played_image:{
    height:"70%",
    width:"15%",
    borderRadius:10
  },
  recently_played_list_text:{
    height:"100%",
    width:"60%",
    justifyContent:"center"
  },
  recently_played_list_text1:{
    fontSize:15,
    marginLeft:10,
    color: "white"
  },
  recently_played_list_text2:{
    fontSize:16,
    color:"white",
    marginLeft: 10
  }
}
);