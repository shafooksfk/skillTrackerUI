import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Admin.scss";
import validate from "../../utils/validation/Validation";
import DataTable from "./DataTable";
import { technicalSkills } from "../../dataset/TechnicalSkills";
import { nonTechnicalSkills } from "../../dataset/NonTechnicalSkills";
import axios from "axios";
import ModelView from "./ModelView";
import { envAdmin } from "../../utils/environment/Environment";
import { Link } from "react-router-dom";

export default function Admin() {
  const [showModel, setShowModel] = useState(false);
  const [id, setid] = useState();

  const [values, setvalues] = useState({
    name: "",
  });
  const [resMessage, setresMessage] = useState("");
  const [data, setdata] = useState([]);
  const [show, setShow] = useState(false);
  const [dataTable, setDataTable] = useState({
    skillCategory: "",
    skill: "",
  });

  const [error, seterror] = useState({});
  const [isValid, setisValid] = useState(false);
  const [validationValues, setvalidationValues] = useState({
    fields: {
      name: {
        value: "",
        required: false,
      },
      skillCategory: {
        value: "",
        required: true,
        description: "Select an option",
      },
      skill: {
        value: "",
        required: true,
        description: "Select a skill",
      },
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setvalidationValues({
      ...validationValues,
      fields: {
        ...validationValues.fields,
        [name]: { ...validationValues.fields[name], value: value },
      },
    });
    setvalues({ ...values, [name]: value });
  }

  function handleSearch(e) {
    e.preventDefault();
    seterror(validate(validationValues));
    setisValid(true);
  }

  useEffect(() => {
    if (Object.keys(error).length === 0 && isValid) {
      console.log(values);
      setDataTable({
        skillCategory: values.skillCategory,
        skill: values.skill,
      });
      axios
        .post(`${envAdmin}search`, values)
        .then((obj) => {
          setresMessage(obj.data.message);
          if (obj.data.listData?.length !== 0 && obj.data.listData !== null) {
            setdata(obj.data.listData);
            console.log(data);
            setShow(false);
          } else {
            setdata([]);
            setShow(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isValid]);

  return (
    <div>
      {!showModel ? (
        <>
          <Link to="/">
            <h6 className="my-3">Go to home</h6>
          </Link>
          <h1>Welcome to Admin Panel</h1>
          <h4 className="mt-3">Search Profile</h4>
          <Form className="mt-4 d-flex flex-column">
            <div className="adminSearch">
              <Form.Group className="mb-3 w-100">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {error.name && <p className="error">{error.name}</p>}
              </Form.Group>
              <Form.Group className="mb-3 w-100">
                <Form.Label>Skill Category</Form.Label>
                <Form.Select
                  aria-label="Skill"
                  value={values.skillCategory}
                  name="skillCategory"
                  onChange={handleChange}
                >
                  <option value="">Select an option</option>
                  <option value="technicalSkills">Technical Skills</option>
                  <option value="nonTechnicalSkills">
                    Non Technical Skills
                  </option>
                </Form.Select>
                {error.skillCategory && (
                  <p className="error">{error.skillCategory}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3 w-100">
                <Form.Label>Skill</Form.Label>
                <Form.Select
                  aria-label="Skill"
                  value={values.skill}
                  name="skill"
                  onChange={handleChange}
                  disabled={values.skillCategory ? false : true}
                >
                  <option>Select an option</option>
                  {values.skillCategory === "technicalSkills" &&
                    technicalSkills.map((obj, index) => {
                      return (
                        <option key={index} value={obj.value}>
                          {obj.name}
                        </option>
                      );
                    })}
                  {values.skillCategory === "nonTechnicalSkills" &&
                    nonTechnicalSkills.map((obj, index) => {
                      {
                        return (
                          <option key={index} value={obj.value}>
                            {obj.name}
                          </option>
                        );
                      }
                    })}
                </Form.Select>
                {error.skill && <p className="error">{error.skill}</p>}
              </Form.Group>
            </div>
            <Button
              className="align-self-end"
              variant="primary"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Form>
          {data.length !== 0 && (
            <DataTable
              data={data}
              skillCategory={dataTable.skillCategory}
              skill={dataTable.skill}
              setShowModel={setShowModel}
              setid={setid}
            />
          )}

          {data.length === 0 && show && <h4 className="my-4">{resMessage}</h4>}
        </>
      ) : (
        <ModelView data={data[id]} setShowModel={setShowModel}></ModelView>
      )}
    </div>
  );
}
