import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <NextUIProvider>
      <Nav />
      <RouterProvider router={router} />
    </NextUIProvider>
  </>
);
