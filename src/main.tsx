import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";

import "./index.css";

import Nav from "./components/Nav.tsx";
import App from "./pages/App.tsx";
import Posts from "./pages/Posts.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Nav />
        <RouterProvider router={router} />
      </NextThemesProvider>
    </NextUIProvider>
  </>
);
