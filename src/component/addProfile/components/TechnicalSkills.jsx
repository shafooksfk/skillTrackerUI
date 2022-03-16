import React from "react";
import { Button, Table } from "react-bootstrap";
import { technicalSkills } from "../../../dataset/TechnicalSkills";
export default function TechnicalSkills(props) {
  return (
    <>
      <h4 className="my-3">Enter Technical Skills</h4>
      <button className="mb-3 goBackbtn" onClick={props.handleGoback}>
        Go Back
      </button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Technical Skills</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {technicalSkills.map((obj, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{obj.name}</td>
                <td className="d-flex">
                  <input
                    type="text"
                    name={obj.value}
                    onChange={props.handleChange}
                    value={props.values[obj.value]}
                  />
                  {props.error[obj.value] && (
                    <p className="error px-2 align-self-center">
                      {props.error[obj.value]}
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button variant="primary" type="submit" onClick={props.handleContinue}>
        Continue
      </Button>
    </>
  );
}
