import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {ActivityIndicator, Alert, View, StyleSheet} from 'react-native';

const Link = ({route, navigation}) => {
  const starUrl = route.params?.star;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const name_url = route.params?.name;
      navigation.setOptions({
        title: name_url,
      });
    } catch (error) {
      Alert.alert(error);
    }
  }, [route.params, navigation]);

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: starUrl}}
        style={{flex: 1}}
        onLoadEnd={handleLoadEnd}
        onLoadStart={handleLoadStart}
      />

      {isLoading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: semitransparent background
          }}>
          <ActivityIndicator color="#7159c1" size={43} />
        </View>
      )}
    </View>
  );
};

export default Link;
