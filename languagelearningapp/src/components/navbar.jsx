import { useState, useContext } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { ReactComponent as MagnifyingGlassIcon } from "../imgs/icons/magnifying-glass-solid.svg";
import { ReactComponent as BellIcon } from "../imgs/icons/bell-regular.svg";
import { ReactComponent as UserIcon } from "../imgs/icons/user-solid.svg";
import { ReactComponent as HomeIcon } from "../imgs/icons/house-solid.svg";
import "../css/navbar.css";
import { Popover } from "@mui/material";
import { logoutUser } from "../utils/auth";
import { userContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const [value, setValue] = useState("home");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const { user, setUser } = useContext(userContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (user.name === "Guest") {
      setUser(null);
      toast.success("Guest logged out.");
      handleClose();
      navigate("/login");
    } else if (user && user.name !== "Guest") {
      logoutUser(user, setUser, navigate, toast);
      handleClose();
    }
  };

  const open = Boolean(anchorEl); // popover open state

  return (
    <div className="nav-bar-container">
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label=" "
          value="home"
          icon={
            <HomeIcon
              className={`nav-btn-icon ${
                value === "home" ? "selected-icon" : ""
              }`}
              style={{ color: value === "home" ? "#7950f2" : "black" }}
            />
          }
        />
        <BottomNavigationAction
          label=" "
          value="search"
          icon={
            <MagnifyingGlassIcon
              className={`nav-btn-icon ${
                value === "search" ? "selected-icon" : ""
              }`}
              style={{ color: value === "search" ? "#7950f2" : "black" }}
            />
          }
        />
        <BottomNavigationAction
          label=" "
          value="notifications"
          icon={
            <BellIcon
              className={`nav-btn-icon ${
                value === "notifications" ? "selected-icon" : ""
              }`}
              style={{
                color: value === "notifications" ? "#7950f2" : "black",
              }}
            />
          }
        />
        <BottomNavigationAction
          label=" "
          value="profile"
          icon={
            <UserIcon
              className={`nav-btn-icon ${
                value === "profile" ? "selected-icon" : ""
              }`}
              style={{ color: value === "profile" ? "#7950f2" : "black" }}
              onClick={handleClick}
            />
          }
        />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <div>
            <div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </Popover>
      </BottomNavigation>
    </div>
  );
}
