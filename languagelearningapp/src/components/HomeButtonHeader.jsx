import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "../css/homeButtonHeader.css";

export default function HomeButtonHeader(props) {
  return (
    <Container fluid className="homeContainer">
      <FontAwesomeIcon
        icon={faHouse}
        className="houseIcon"
        onClick={() => props.navigateToPage("")}
      />
    </Container>
  );
}
