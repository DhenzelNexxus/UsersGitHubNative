/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './pages/Main/main';
import User from './pages/User/user';

//Criação das rotas
const Stack = createNativeStackNavigator();

export default function Routes() {
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
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
