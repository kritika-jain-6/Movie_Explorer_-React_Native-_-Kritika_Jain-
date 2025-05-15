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
