/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import "react-native-gesture-handler";
import { PermissionsProvider } from './src/context/permissionsContext';
import { Navigator } from './src/navigation/navigation';

const AppState = ({ children }: any) => {
  return (<PermissionsProvider>
    {children}
  </PermissionsProvider>)
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};
export default App;
