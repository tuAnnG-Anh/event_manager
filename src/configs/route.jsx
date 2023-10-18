import DefaultLayout from "../components/Layouts/DefaultLayout";
import DashBoard from "../pages/Dashboard";
import Events from "../pages/Events";
import Customer from "../pages/Customer";
import CheckIn from "../pages/Checkin";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";

//Public routes
const publicRoutes = [
  {
    path: "/login",
    page: Login,
  },
  {
    path: "/",
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
    page: CheckIn,
    layout: DefaultLayout,
  },
  {
    path: "*",
    page: NotFound,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
