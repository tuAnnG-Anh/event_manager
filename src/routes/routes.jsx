import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "../configs/route";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { Fragment } from "react";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          let Page = route.page;
          let Layout = DefaultLayout;
          route.layout ? (Layout = route.layout) : (Layout = Fragment);
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
