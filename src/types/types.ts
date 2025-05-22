import {ParamListBase} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface RootStackParamList extends ParamListBase {
  SplashScreen: undefined;
  MainTabs: undefined;
  Login: undefined;
  SearchScreen: undefined;
}

export interface AuthParamList extends ParamListBase {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  SplashScreen: undefined;
  AdminTab: undefined;
}


export  interface HomeStackParamList extends ParamListBase{
  Home: undefined;
  Explore: undefined;
  MovieDetailScreen: {
    movie: {
      id: string;
      title: string;
      genre: string;
      rating: string;
      release_year: string;
      duration: string;
      poster_url: string;
      description: string;
      premium: boolean;
    };
  };
}

export interface SearchStackParamList extends ParamListBase{
  Search: undefined;
  MovieDetailScreen: {
    movie: {
      id: string;
      title: string;
      genre: string;
      rating: string;
      release_year: string;
      duration: string;
      poster_url: string;
      description: string;
      premium: boolean;
    };
  };
}

export interface SubscriptionStackParamList extends ParamListBase{
  Subscription: undefined;
  PaymentCard: undefined;
  MovieDetailScreen: {
    movie: {
      id: string;
      title: string;
      genre: string;
      rating: string;
      release_year: string;
      duration: string;
      poster_url: string;
      description: string;
      premium: boolean;
    };
  };
}