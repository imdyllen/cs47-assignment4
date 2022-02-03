import { StyleSheet, Text, SafeAreaView, Button, Alert, Touchable, View, Image } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors";

export default function Song({ title, artist, index, albumUri, album, duration }) {
    return (
        <SafeAreaView style={styles.song}>
            <Text style={styles.index}>{index}</Text>
            <Image source={{uri: albumUri}} style={styles.albStyle} />
            <View style={styles.child}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
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
    index: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: Colors.gray,
        marginHorizontal: 5,
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