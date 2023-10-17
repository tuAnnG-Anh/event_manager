import DefaultLayout from "../components/Layouts/DefaultLayout";
import DashBoard from "../pages/Dashboard";
import Events from "../pages/Events";
import Customer from "../pages/Customer";
import Checkin from "../pages/Checkin";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";

//Public routes
const publicRoutes = [
  {
    path: "/",
    page: DashBoard,
    layout: DefaultLayout,
  },
  {
    path: "/login",
    page: Login,
  },
  {
    path: "/events",
    page: Events,
    layout: DefaultLayout,
  },
  {
    path: "/customer",
    page: Customer,
    layout: DefaultLayout,
  },
  {
    path: "/checkin",
    page: Checkin,
    layout: DefaultLayout,
  },
  {
    path: "*",
    page: NotFound,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
