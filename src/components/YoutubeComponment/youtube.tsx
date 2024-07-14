import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface WebViewPlayerProps {
  src: string;
}

const WebViewPlayer: React.FC<WebViewPlayerProps> = ({ src }) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: src }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: '100%',
    height: 300,
  },
});

export default WebViewPlayer;
