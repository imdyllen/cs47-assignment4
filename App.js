import { StyleSheet, Text, SafeAreaView, Button, Alert, Touchable, View, Pressable, Image } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors";
import TopTracks from "./flatlist";
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SongDetails from "./SongDetails";
import SongPreview from "./SongPreview";

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      // Authenticated, make API request
      // Comment out the one you are not using
      myTopTracks(setTracks, token);
      //albumTracks(ALBUM_ID, setTracks, token);
    }
  }, [token]);

  function SpotifyAuthButton() {
    return (
      <Pressable onPress={() => {
        promptAsync();
      }}>
        <View style={styles.button}>
          <Image source={require('./assets/spotify-logo.png')} style={styles.logo} />
          <Text style={styles.buttonText}>Connect to Spotify</Text>
        </View>
      </Pressable>
    );
  }

  let contentDisplayed = null;

  if (token) {
    contentDisplayed = <TopTracks data={tracks} />
  } else {
    contentDisplayed = <SpotifyAuthButton />
  }

  return (
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} 
          options={{
            headerShown: false,
          }}>
        </Stack.Screen>
        <Stack.Screen name="SongDetails" component={SongDetails} 
          options={{
            headerBackTitle: 'Back',
            title: 'Song Details'
        }}/>
        <Stack.Screen name="SongPreview" component={SongPreview} 
          options={{
            headerBackTitle: 'Back',
            title: 'Song Preview'
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  logo: {
    width: 20,
    height: 20,
  },
  button: {
    borderRadius: 99999,
    paddingVertical: 10,
    width: 240,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.spotify,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center'
  }
});
