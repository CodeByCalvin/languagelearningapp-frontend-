import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { ReactComponent as MagnifyingGlassIcon } from "../imgs/icons/magnifying-glass-solid.svg";
import { ReactComponent as BellIcon } from "../imgs/icons/bell-regular.svg";
import { ReactComponent as UserIcon } from "../imgs/icons/user-solid.svg";
import { ReactComponent as HomeIcon } from "../imgs/icons/house-solid.svg";
import "../css/navbar.css";

export default function Navbar() {
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="nav-bar-container">
      <BottomNavigation value={value} onChange={handleChange} showLabels={true}>
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
            />
          }
        />
      </BottomNavigation>
    </div>
  );
}
