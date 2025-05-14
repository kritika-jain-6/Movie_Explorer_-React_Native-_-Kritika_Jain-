import React from 'react';
import { useNavigation } from '@react-navigation/native';

/**
 * Higher-Order Component to inject navigation prop into Class Components
 * @param {React.Component} WrappedComponent
 * @returns {React.Component}
 */
const withNavigation = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return function(props: P) {
    const navigation = useNavigation();
    return <WrappedComponent {...props} navigation={navigation} />;
  };
};

export default withNavigation;
