import React, { useEffect, useState } from "react";
import NonTechnicalSkills from "./components/NonTechnicalSkills";
import PersonalDetails from "./components/PersonalDetails";
import TechnicalSkills from "./components/TechnicalSkills";
import "./AddProfile.scss";
import validate from "../../utils/validation/Validation";
import axios from "axios";
import { Link } from "react-router-dom";
import { envEngineer } from "../../utils/environment/Environment";
import SuccessPage from "./components/SuccessPage";

export default function AddProfile() {
  const [values, setvalues] = useState({});
  const [state, setstate] = useState(0);
  const [error, seterror] = useState({});
  const [isValid, setisValid] = useState(false);
  const [checkAssociateId, setcheckAssociateId] = useState(true);

  //personal details validation
  const [data1, setdata1] = useState({
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
      phoneNumber: {
        value: "",
        required: true,
        validate: { pattern: /^\d{10}$/ },
        description: "10 digit number",
      },
      email: {
        value: "",
        required: true,
        validate: { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
        description: "Email is not valid",
      },
    },
  });

  //technical skills validation
  const [data2, setdata2] = useState({
    fields: {
      htmlCssJavascript: {
        value: "",
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      angular: {
        value: "",
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      react: {
        value: "",
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      spring: {
        value: "",
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      restful: {
        value: "",
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      hibernate: {
        value: "",
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      git: {
        value: "",
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      docker: {
        value: "",
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      jenkins: {
        value: "",
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      aws: {
        value: "",
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
    },
  });

  // non technical skills validation
  const [data3, setdata3] = useState({
    fields: {
      spoken: {
        value: "",
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      communication: {
        value: "",
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
      aptitude: {
        value: "",
        required: true,
        validate: { pattern: /^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/ },
        description: "Number should range between 1-20",
      },
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (state === 0) {
      setdata1({
        ...data1,
        fields: {
          ...data1.fields,
          [name]: { ...data1.fields[name], value: value },
        },
      });
      setvalues({ ...values, [name]: value });
    } else if (state === 1) {
      setdata2({
        ...data2,
        fields: {
          ...data2.fields,
          [name]: { ...data2.fields[name], value: value },
        },
      });
      setvalues({
        ...values,
        technicalSkills: { ...values.technicalSkills, [name]: value },
      });
    } else {
      setdata3({
        ...data3,
        fields: {
          ...data3.fields,
          [name]: { ...data3.fields[name], value: value },
        },
      });
      setvalues({
        ...values,
        nonTechnicalSkills: { ...values.nonTechnicalSkills, [name]: value },
      });
    }
  }

  function handleGoback(e) {
    e.preventDefault();
    setstate(state - 1);
  }

  function handleContinue(e) {
    e.preventDefault();
    if (state === 0) seterror(validate(data1));
    else if (state === 1) seterror(validate(data2));
    setisValid(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state === 2) seterror(validate(data3));
    setisValid(true);
  }

  useEffect(() => {
    if (Object.keys(error).length === 0 && isValid) {
      if (state === 2) {
        // setstate(0);
        setstate(state + 1);
        console.log(values);
        axios
          .post(`${envEngineer}add-profile`, values)
          .then((data) => {
            console.log("Posted Succesfully \n", data);
          })
          .catch((error) => {
            console.log("Error\n", error);
          });
        setvalues({});
      } else if (state === 0) {
        console.log(values.associateId);
        axios
          .post(
            `${envEngineer}search-associate-id?associateId=` +
              values.associateId
          )
          .then((res) => {
            if (!res.data) {
              setstate(state + 1);
            }
            setcheckAssociateId(!res.data);
          });
      } else {
        setstate(state + 1);
      }
    }
  }, [error, isValid]);

  return (
    <div>
      {state === 0 && (
        <Link to="/">
          <h6 className="my-3">Go to home</h6>
        </Link>
      )}
      {state === 3 ? null : <h1>Add New Profile</h1>}
      {state === 0 && (
        <PersonalDetails
          handleChange={handleChange}
          values={values}
          handleContinue={handleContinue}
          error={error}
          checkAssociateId={checkAssociateId}
        />
      )}
      {state === 1 && (
        <TechnicalSkills
          handleChange={handleChange}
          handleGoback={handleGoback}
          handleContinue={handleContinue}
          values={values}
          error={error}
        />
      )}
      {state === 2 && (
        <NonTechnicalSkills
          handleChange={handleChange}
          handleGoback={handleGoback}
          handleSubmit={handleSubmit}
          values={values}
          error={error}
        />
      )}
      {state === 3 && <SuccessPage />}
    </div>
  );
}
