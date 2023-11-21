import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import THEME from './src/theme';
import { Provider } from './src/context';
import { Router } from './src/routes/Router';

export default function App() {

  return (
    <ThemeProvider theme={THEME}>
      <Provider>
      <StatusBar
        animated={true}
        hidden={false}
        barStyle="light-content"
      />
      <Router />
    </Provider>
    </ThemeProvider>
  );
}
