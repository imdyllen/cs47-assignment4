import { WebView } from "react-native-webview";

export default function WebViewComponent({ route }) {
    const { url } = route.params;

    return (
        <WebView
            source={{
                uri: url
            }}
        />
    );
}