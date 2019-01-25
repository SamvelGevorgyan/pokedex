import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import {Provider} from "react-redux"
import {store} from "./redux/store";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './index.css';

const theme = createMuiTheme({
    palette: {
        primary: {main: "#2196f3"},
        secondary: {main: '#e91e63'},
    },
    typography: {useNextVariants: true},
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();