import React from "react";
import { Button, Form } from "react-bootstrap";

export default function PersonalDetails(props) {
  return (
    <>
      <h4 className="mt-3">Enter Personal Details</h4>
      <Form className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={props.values.name}
            onChange={props.handleChange}
          />
          {props.error.name && <p className="error">{props.error.name}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Associate ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter id"
            name="associateId"
            value={props.values.associateId}
            onChange={props.handleChange}
          />
          {props.error.associateId && <p className="error">{props.error.associateId}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phoneNumber"
            value={props.values.phoneNumber}
            onChange={props.handleChange}
            />
          {props.error.phoneNumber && <p className="error">{props.error.phoneNumber}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            name="email"
            value={props.values.email}
            onChange={props.handleChange}
            />
          {props.error.email && <p className="error">{props.error.email}</p>}
        </Form.Group>
        <Button variant="primary" type="submit" onClick={props.handleContinue}>
          Continue
        </Button>
        {!props.checkAssociateId && <p className="error mt-2">User Already Exists</p> }
      </Form>
    </>
  );
}
