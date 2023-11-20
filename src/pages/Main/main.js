import React, {Component} from 'react';
import {Keyboard, ActivityIndicator, Alert} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Form,
  Input,
  Label,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButtom,
  ProfileButtomText,
} from './styles';
import api from '../../services/api';
import {AxiosError} from 'axios';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Usuários',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({users: JSON.parse(users)});
    }
  }

  componentDidUpdate(_, prevState) {
    const {users} = this.state;

    if (prevState.users !== this.state.users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleNavigate = async user => {
    const {navigation} = this.props;

    const login = user.login;
    await AsyncStorage.setItem('UserAtual', login);

    navigation.navigate('User');
  };

  handleAddUser = async () => {
    const {users, newUser} = this.state;
    try {
      this.setState({loading: true});

      const response = await api.get(`/users/${newUser}`);

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [...users, data],
        newUser: '',
      });

      Keyboard.dismiss();
    } catch (error) {
      if (error.response?.status === 404) {
        Alert.alert(
          'Error ao adicionar usuário',
          'Tente Novamente!',
          [
            {
              text: 'Conferir',
              onPress: () => {},
              style: 'default',
            },
          ],
          {cancelable: false},
        );
      }
      console.log(error);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {users, newUser, loading} = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o nome do Usuário"
            value={newUser}
            onChangeText={text => this.setState({newUser: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />

          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Label>Adicionar</Label>
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({item}) => (
            <User>
              <Avatar source={{uri: item.avatar}} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButtom onPress={() => this.handleNavigate(item)}>
                <ProfileButtomText>Ver Perfil</ProfileButtomText>
              </ProfileButtom>
            </User>
          )}
        />
      </Container>
    );
  }
}
