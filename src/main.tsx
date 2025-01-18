import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const PORT = 7000;
const api_url = `http://localhost:${PORT}/graphql`;

const client = new ApolloClient({
  uri: api_url,
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <App />
    </StrictMode>
  </ApolloProvider>
);
