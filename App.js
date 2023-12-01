import { ThemeProvider } from 'styled-components/native';
import THEME from './src/theme';
import { Provider } from './src/context';
import { Router } from './src/routes/Router';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <ThemeProvider theme={THEME}>
      <Provider>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
        />
        <Router />
    </Provider>
    </ThemeProvider>
  );
}
