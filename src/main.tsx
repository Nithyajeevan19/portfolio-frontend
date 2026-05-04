import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { getRouter } from "./router";
import { queryClientInstance } from "./lib/query-client";
import "./styles.css";

const router = getRouter();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClientInstance}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
