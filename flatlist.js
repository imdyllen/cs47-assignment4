import { StyleSheet, Text, SafeAreaView, Button, Alert, Touchable, View, Image, FlatList } from "react-native";
import Colors from "./Themes/colors";
import Song from "./song";
import millisToMinutesAndSeconds from "./utils/millisToMinuteSeconds";

export default function TopTracks({ data }) {
    const renderItem = ({ item }) => {
        //console.log(item.external_urls.spotify)
        return (
            <Song
                external_url={item.external_urls.spotify}
                preview_url={item.preview_url}
                albumUri={item.album.images[1].url}
                title={item.name}
                artist={item.album.artists[0].name}
                album={item.album.name}
                duration={millisToMinutesAndSeconds(item.duration_ms)}
            />
        )

    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleRow}>
                <Image source={require('./assets/spotify-logo.png')} style={styles.logo} />
                <Text style={styles.titleStyle}>My Top Tracks</Text>
            </View>
            <FlatList
                data={data}
                //renderItem={({ item }) => renderItem(item)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    titleRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        width: 180,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    logo: {
        width: 20,
        height: 20,
    },
});