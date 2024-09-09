import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.config.js";

createRoot(document.getElementById("root")).render(

    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>

);
