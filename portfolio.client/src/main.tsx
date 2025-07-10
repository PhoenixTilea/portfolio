import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import App from './App.tsx';
import store from "./state/store";
import {LocalizationProvider} from "@mui/x-date-pickers/localizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/adapterDayjs";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </Provider>
  </StrictMode>,
);
