import { useLocale } from "antd/es/locale";
import "./resources/Styles/tailwindcss.init.css";
import AppRoutes from "./routes/routes";
import { useLocation } from "react-router-dom";

function App() {
  const logged = JSON.parse(localStorage.getItem("userLogged"));

  return (
    <>
      <AppRoutes logged={logged} />
    </>
  );
}

export default App;
