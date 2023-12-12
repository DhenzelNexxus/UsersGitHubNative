import React, {Component} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';
import {EmptyText} from '../Main/styles';
import api from '../../services/api';

export default class User extends Component {
  state = {
    newUser: '',
    name: '',
    bio: '',
    avatar: '',
    stars: [],
    loading: false,
  };

  // Função para atualizar o título da navegação
  updateInfo = async () => {
    const {navigation} = this.props;

    try {
      this.setState({
        loading: true,
      });

      const user = await AsyncStorage.getItem('UserAtual');

      const userData = await api.get(`/users/${user}`);
      const response = await api.get(`/users/${user}/starred`);

      console.log(response.data);

      this.setState({
        stars: response.data,
      });

      this.setState({
        name: userData.data.name,
        bio: userData.data.bio,
        avatar: userData.data.avatar_url,
      });

      navigation.setOptions({
        title: user,
      });
    } catch (error) {
      if (error.response?.status === 404) {
        Alert.alert(
          'Error Buscar Informações do Usuário',
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
    const {name, bio, avatar, stars, loading} = this.state;
    const {navigation} = this.props;

    async function setDataUrl() {
      await AsyncStorage.setItem('url', stars);
    }

    setDataUrl();
    return (
      <Container onLayout={this.updateInfo}>
        {loading ? (
          <Loading>
            <ActivityIndicator color="#7159c1" size={45} />
          </Loading>
        ) : (
          <>
            <Header>
              <Avatar source={{uri: avatar}} />
              <Name>{name}</Name>
              <Bio>{bio}</Bio>
            </Header>
            <Stars
              data={stars}
              keyStractor={star => String(star.id)}
              ListEmptyComponent={<EmptyText>Não há ações recentes</EmptyText>}
              renderItem={({item}) => (
                <Starred>
                  <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                  <Info>
                    <Title
                      onPress={() =>
                        navigation.navigate('Webview', {
                          star: item.html_url,
                          name: item.name,
                        })
                      }>
                      {item.name}
                    </Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              )}
            />
          </>
        )}
      </Container>
    );
  }
}
