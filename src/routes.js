/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './pages/Main/main';
import User from './pages/User/user';
import AsyncStorage from '@react-native-community/async-storage';
import {useState} from 'react';
import Link from './pages/WebView';

//Criação das rotas
const Stack = createNativeStackNavigator();

export default function Routes() {
  const [login, setLogin] = useState('');

  const getLogin = async () => {
    const new_login = await AsyncStorage.getItem('UserAtual');

    setLogin(new_login);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Usuários">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Usuários',
            headerTitleAlign: 'center',
            statusBarColor: '#7159c1',
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#7159c1',
            },
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{
            headerTitleAlign: 'center',
            statusBarColor: '#7159c1',
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#7159c1',
            },
          }}
        />
        <Stack.Screen
          name="Webview"
          component={Link}
          options={{
            headerTitleAlign: 'center',
            statusBarColor: '#7159c1',
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#7159c1',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
