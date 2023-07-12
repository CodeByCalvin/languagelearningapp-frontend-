import * as React from "react";
import Switch, { switchClasses } from "@mui/joy/Switch";
import { useState, useEffect } from "react";

export default function IOSSwitch(props) {
  const {checked, setChecked} = props;



  return (
    <Switch
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      sx={(theme) => ({
        "--Switch-thumbShadow": "0 3px 7px 0 rgba(0 0 0 / 0.12)",
        "--Switch-thumbSize": "25px",
        "--Switch-trackWidth": "45px",
        "--Switch-trackHeight": "29px",
        "--Switch-trackBackground": theme.vars.palette.background.level3,
        [`& .${switchClasses.thumb}`]: {
          transition: "width 0.2s, left 0.2s",
        },
        "&:hover": {
          "--Switch-trackBackground": theme.vars.palette.background.level3,
        },
        "&:active": {
          "--Switch-thumbWidth": "20px",
        },
        [`&.${switchClasses.checked}`]: {
          "--Switch-trackBackground": "var(--main-purple)",
          "&:hover": {
            "--Switch-trackBackground": "var(--main-purple)",
          },
        },
      })}
    />
  );
}
