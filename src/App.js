import React, { Component } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Sukses } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sukses",
    element: <Sukses />,
  },
]);

export default class App extends Component {
  render() {
    return (
      <>
        <NavbarComponent />
        <RouterProvider router={router} />
      </>
    );
  }
}
