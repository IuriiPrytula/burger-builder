import React from "react"
import classes from "./MenuToggle.css"

const menuToggle = props => (
  <div className={classes.MenuToggle} onClick={props.clicked}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="#fff"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  </div>
)

export default menuToggle
