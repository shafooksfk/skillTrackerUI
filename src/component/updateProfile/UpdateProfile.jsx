import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import "./UpdateProfile.scss";
import validate from "../../utils/validation/Validation";
import { Link } from "react-router-dom";
import { envEngineer } from "../../utils/environment/Environment";
import { technicalSkills } from "../../dataset/TechnicalSkills";
import { nonTechnicalSkills } from "../../dataset/NonTechnicalSkills";

export default function UpdateProfile() {
  const [values, setvalues] = useState({});
  const [data, setdata] = useState({});
  const [message, setmessage] = useState("");
  const [success, setsuccess] = useState(false);
  const [show, setshow] = useState(false);

  const [technical, settechnical] = useState([]);
  const [nonTechnical, setnonTechnical] = useState([]);

  const [searchError, setsearchError] = useState({});
  const [searchIsValid, setsearchIsValid] = useState(false);
  const [searchValues, setsearchValues] = useState({
    fields: {
      name: {
        value: "",
        required: true,
        validate: { pattern: /^[a-zA-Z](\s?[a-zA-Z]){4,29}$/ }, //name with space is valid
        description: "5-30 characters are required",
      },
      associateId: {
        value: "",
        required: true,
        validate: { pattern: /^CTS\d{1,29}$/ },
        description: "Format: CTS followed by number",
      },
    },
  });

  const [updateError, setupdateError] = useState({});
  const [updateIsValid, setupdateIsValid] = useState(false);
  const [updateData, setupdateData] = useState({
    fields: {
      htmlCssJavascript: {
        value: data?.technicalSkills?.htmlCssJavascript,
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      angular: {
        value: data?.technicalSkills?.angular,
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      react: {
        value: data?.technicalSkills?.react,
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      spring: {
        value: data?.technicalSkills?.spring,
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      restful: {
        value: data?.technicalSkills?.restful,
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      hibernate: {
        value: data?.technicalSkills?.hibernate,
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      git: {
        value: data?.technicalSkills?.git,
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      docker: {
        value: data?.technicalSkills?.docker,
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      jenkins: {
        value: data?.technicalSkills?.jenkins,
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      aws: {
        value: data?.technicalSkills?.aws,
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },

      spoken: {
        value: data?.nonTechnicalSkills?.spoken,
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      communication: {
        value: data?.nonTechnicalSkills?.communication,
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      aptitude: {
        value: data?.nonTechnicalSkills?.aptitude,
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
    },
  });

  function handleSearchChange(e) {
    const { name, value } = e.target;
    setsearchValues({
      ...searchValues,
      fields: {
        ...searchValues.fields,
        [name]: { ...searchValues.fields[name], value: value },
      },
    });
    setvalues({ ...values, [name]: value });
  }

  function handleSearch(e) {
    e.preventDefault();
    setsearchError(validate(searchValues));
    setsearchIsValid(true);
    setsuccess(false);
    // console.log(values);
  }

  useEffect(() => {
    if (Object.keys(searchError).length === 0 && searchIsValid) {
      axios
        .post(
          `${envEngineer}search-profile`,
          values
        )
        .then((res) => {
          // console.log(res.data);
          if (res.data.data) {
            setdata(res.data.data);
            settechnical(Object.keys(res.data.data.technicalSkills));
            setnonTechnical(Object.keys(res.data.data.nonTechnicalSkills));
            setshow(true);
            setmessage("");
          } else {
            setmessage(res.data.message);
            setshow(false);
          }
        })
        .catch((error) => {
          console.log(error, "\n Error");
        });
    }
  }, [searchError, searchIsValid]);

  function handleChange(e) {
    const { name, value } = e.target;
    setupdateData({
      ...updateData,
      fields: {
        ...updateData.fields,
        [name]: { ...updateData.fields[name], value: value },
      },
    });
    console.log(updateData);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setupdateError(validate(updateData));
    setupdateIsValid(true);
  }

  useEffect(() => {
    if (Object.keys(updateError).length === 0 && updateIsValid) {
      axios
        .put(
          `${envEngineer}update-profile/${data.id}`,
          data
        )
        .then((res) => {
          console.log("updated Succefully ", res);
          if (res.status === 200) setsuccess(true);
          // setdata({})
          setshow(false);
          setmessage("");
        })
        .catch((res) => {
          console.log("error ", res);
        });
    }
  }, [updateError, updateIsValid]);

  return (
    <div>
      <Link to="/">
        <h6 className="my-3">Go to home</h6>
      </Link>
      <h1>Update Profile</h1>
      <Form className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={values.name}
            onChange={handleSearchChange}
          />
          {searchError.name && <p className="error">{searchError.name}</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Associate Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="associateId"
            value={values.associateId}
            onChange={handleSearchChange}
          />
          {searchError.associateId && (
            <p className="error">{searchError.associateId}</p>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSearch}>
          Search
        </Button>
      </Form>
      {show && (
        <>
          <h4 className="my-3">Technical Skills</h4>
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
                if (obj !== "id") {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{obj.name}</td>
                      <td>
                        <input
                          type="text"
                          name={obj.value}
                          value={data?.technicalSkills[obj.value]}
                          onChange={(e) => {
                            handleChange(e);
                            setdata({
                              ...data,
                              technicalSkills: {
                                ...data.technicalSkills,
                                [e.target.name]: e.target.value,
                              },
                            });
                          }}
                        />
                        {updateError[obj] && (
                          <p className="error">{updateError[obj]}</p>
                        )}
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
          <h4 className="my-3">Non Technical Skills</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Technical Skills</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {nonTechnicalSkills.map((obj, index) => {
                if (obj !== "id") {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{obj.name}</td>
                      <td>
                        <input
                          type="text"
                          name={obj.value}
                          value={data?.nonTechnicalSkills[obj.value]}
                          onChange={(e) => {
                            handleChange(e);
                            setdata({
                              ...data,
                              nonTechnicalSkills: {
                                ...data.nonTechnicalSkills,
                                [e.target.name]: e.target.value,
                              },
                            });
                          }}
                        />
                        {updateError[obj] && (
                          <p className="error">{updateError[obj]}</p>
                        )}
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
          <Button type="submit" onClick={handleSubmit}>
            Update
          </Button>
        </>
      )}
      <p className="error mt-3">{message}</p>
      {success && <p className="mt-3">Updated Successfully</p>}
    </div>
  );
}
