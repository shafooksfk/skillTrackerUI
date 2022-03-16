import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>
            <h1 className="my-3">Welcome To Skill Tracker</h1>
          </Card.Title>
          <Card.Text>
            <Link to={"/addprofile"}>
              <h6>Add a new profile</h6>
            </Link>
            <Link to={"/updateprofile"}>
              <h6>Update an existing profile</h6>
            </Link>
            <Link to={"/admin"}>
              <h6>Admin Page</h6>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
