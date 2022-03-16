import React from "react";
import { technicalSkills } from "../../dataset/TechnicalSkills";
import { nonTechnicalSkills } from "../../dataset/NonTechnicalSkills";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ModelView({ data, setShowModel }) {
  return (
    <div>
      <Link to="/admin"><h6 onClick={()=>{setShowModel(false)}}>Go Back</h6></Link>
      <h3>Profile Details</h3>
      <h5>{data.name}</h5>
      <h6>{data.associateId}</h6>
      <div>
        <p>Email: {data.email}</p>
        <p>Contact Number: {data.phoneNumber}</p>
      </div>
      <h5 className="mt-4">Technical Skills</h5>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Technical SKills</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {technicalSkills.map((obj, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{obj.name}</td>
                <td>{data.technicalSkills[obj.value]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h5 className="mt-5">Non Technical Skills</h5>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Non Technical SKills</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {nonTechnicalSkills.map((obj, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{obj.name}</td>
                <td>{data.nonTechnicalSkills[obj.value]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
