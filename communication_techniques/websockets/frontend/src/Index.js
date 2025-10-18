import React from "react";

import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import Namespace from "./components/Namespace";
import Chat from "./components/Chat";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/namespace",
        element: <Namespace />,
      },
      {
        path: "/chat/:namespaceId",
        element: <Chat />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("body"));
root.render(<RouterProvider router={appRouter} />);
