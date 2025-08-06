// app/index.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: 'https://giflis.com' }} />
    </View>
  );
}

