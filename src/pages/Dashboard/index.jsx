import { useNavigate } from "react-router-dom";

function DashBoard() {
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  const navigate = useNavigate();
  console.log(userLogged);
  userLogged ? navigate("/login") : navigate("/events");
  return <div>HOME</div>;
}
export default DashBoard;
