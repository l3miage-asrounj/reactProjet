import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './src/navigation/Navigator';
import { FavorisProvider } from './src/hooks/Context';


export default function App() {
  return (
    <FavorisProvider>
      <Navigator />
    </FavorisProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
