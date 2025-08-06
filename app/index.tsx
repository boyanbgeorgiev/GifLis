import { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { WebView } from 'react-native-webview';

export default function App() {
  const [versionName, setVersionName] = useState<string | null>(null);
  const [versionCode, setVersionCode] = useState<string | null>(null);

  useEffect(() => {
    // Get app version info
    setVersionName(DeviceInfo.getVersion());
    setVersionCode(DeviceInfo.getBuildNumber());
  }, []);

  // Inject version info into the WebView
  const injectedJS = `
    window.ios_version = {
      versionName: "${versionName ?? ''}",
      versionCode: "${versionCode ?? ''}"
    };
    true; // Required for iOS
  `;

  return (
    <View style={styles.container}>
      {/* Hide Status Bar for true fullscreen */}
      <StatusBar hidden={true} />

      {versionName ? (
        <WebView
          source={{ uri: 'https://giflis.com' }}
          style={styles.webview}
          injectedJavaScript={injectedJS}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          automaticallyAdjustContentInsets={false}
          renderLoading={() => (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        />
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  webview: {
    flex: 1,
    backgroundColor: 'black',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
