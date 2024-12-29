import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Order, { loader as loaderOrderItem } from "./features/order/Order";
import { action as actionOrderUpdate } from './features/order/updateOrderItem'
import CreateOrder, { action } from "./features/order/CreateOrder";
import Cart from "./features/cart/Cart";
import Home from "./ui/Home";
import Menu, { loader as MenuLoader } from "./features/menu/Menu";
import CreateUser from "./features/user/CreateUser";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const routers = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "menu",
        element: <Menu />,
        loader: MenuLoader,
        errorElement: <Error />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "order/new",
        element: <CreateOrder />,
        action: action,
      },
      {
        path: "order/:orderID",
        element: <Order />,
        loader: loaderOrderItem,
        errorElement: <Error />,
        action: actionOrderUpdate
      },
      { path: "user", element: <CreateUser /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
