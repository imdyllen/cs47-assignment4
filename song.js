import { StyleSheet, Text, SafeAreaView, Button, Alert, Touchable, View, Image, Pressable } from "react-native";
import Colors from "./Themes/colors";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


export default function Song({ title, artist, albumUri, album, duration,
    external_url, preview_url }) {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.song}>
            <Pressable style={styles.view} onPress={() => navigation.navigate('SongPreview', {
                url: preview_url
            })}>
                <Ionicons name="play-circle" size={20} style={styles.icon} />
            </Pressable>
            <Image source={{ uri: albumUri }} style={styles.albStyle} />
            <View style={styles.child}>
                <Pressable onPress={() => navigation.navigate('SongDetails', {
                    url: external_url
                })}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                </Pressable>
                <Text style={styles.artist} numberOfLines={1}>{artist}</Text>
            </View>
            <Text style={styles.album} numberOfLines={1}>{album}</Text>
            <Text style={styles.duration}>{duration}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    song: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 8,
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: Colors.spotify,
    },
    albStyle: {
        flex: 2,
        aspectRatio: 1 / 1,
        marginHorizontal: 5,
    },
    child: {
        flex: 4,
        marginHorizontal: 5,
    },
    title: {
        color: 'white',
    },
    artist: {
        color: Colors.gray,
    },
    album: {
        flex: 3,
        textAlign: 'center',
        color: 'white',
        marginHorizontal: 5,
    },
    duration: {
        flex: 1,
        color: 'white',
        marginHorizontal: 5,
    }
});