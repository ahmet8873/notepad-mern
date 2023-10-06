import { FaSignOutAlt } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux-toolkit/authSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());

    navigate("/login");
  };
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">NotePad</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt />
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <AiOutlineLogin />
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <SiGnuprivacyguard />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
