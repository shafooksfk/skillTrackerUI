import React from "react";
import { Table } from "react-bootstrap";

export default function DataTable({
  data,
  skillCategory,
  skill,
  setShowModel,
  setid,
}) {
  return (
    <div className="mt-3">
      <h4 className="my-3">Search Result</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Associate Id</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Expertise Level</th>
          </tr>
        </thead>
        <tbody>
          {data.map((obj, index) => {
            return (
              <tr
                key={index}
                onClick={() => {
                  setShowModel(true);
                  setid(index);
                }}
              >
                <td>{index + 1}</td>
                <td>{obj.name}</td>
                <td>{obj.associateId}</td>
                <td>{obj.email}</td>
                <td>{obj.phoneNumber}</td>
                <td>{obj[skillCategory][skill]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
