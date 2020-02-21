import React, { useEffect, useState } from "react";
import { withFormik, Form, Field } from "formik";
import User from "./User";
import * as yup from "yup";
import axios from "axios";
import "../App.css";
import styled from "styled-components";

const Button = styled.button`
  width: 100px;
  height: 30px;
  background-color: cadetblue;

  &:hover {
    background-color: darkcyan;
  }
`;
function FormComp({ touched, errors, status }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    status && setUser(status);
  }, [status]);

  return (
    <div className="onboard-form">
      <Form className="form">
        <label>
          Name:
          <Field type="text" name="Name" placeholder="Name" />
          {touched.Name && errors.Name && (
            <p className="errors">{errors.Name}</p>
          )}
        </label>
        <label>
          Email:
          <Field type="email" name="Email" placeholder="email address" />
          {touched.Email && errors.Email && (
            <p className="errors">{errors.Email}</p>
          )}
        </label>
        <label>
          Password:
          <Field type="password" name="Password" placeholder="password"></Field>
          {touched.Password && errors.Password && (
            <p className="errors">{errors.Password}</p>
          )}
        </label>
        <label className="checkbox-container">
          Terms Of Service
          <Field type="checkbox" name="TOS" />
          <span className="checkmark" />
          {touched.TOS && errors.TOS && <p className="errors">{errors.TOS}</p>}
        </label>
        <div className="button-styles">
          <Button>Submit!</Button>
        </div>
        <User user={user} />
      </Form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: props => ({
    Name: "",
    Email: "",
    Password: "",
    TOS: false
  }),

  validationSchema: yup.object().shape({
    Name: yup.string().required("This is the name field and it is required!"),

    Email: yup
      .string()
      .email()
      .required("You need to put an email you dolt!!!"),

    Password: yup.string().required("You must enter a password, chief"),

    TOS: yup.bool().oneOf([true], "You gotta read the TOS, sir")
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
    // console.log("Submitting!", values)
    axios
      .post("https://reqres.in/api/users/", values)
      .then(response => {
        // console.log(response.data);
        setStatus(response.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(FormComp);
