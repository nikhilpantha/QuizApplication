import React, { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [errorValidation, setErrorValidation] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const previousUser = window.localStorage.getItem("email");
      const UserPassword = window.localStorage.getItem("password");
      if (values.email === previousUser && UserPassword === values.password) {
        history.push("/");
        window.localStorage.setItem("loggedIn", "yes");
      } else {
        setErrorValidation(true);
      }
    },
  });

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-gray-200">
      <div className="w-full sm:w-96 flex flex-col justify-center items-center bg-white p-10 space-y-5 rounded-md">
        <h1 className="flex justify-center text-4xl font-semibold">log In</h1>
        <FormikProvider value={formik}>
          <Form
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            className="space-y-3 w-full"
          >
            <input
              type="email"
              placeholder="user email"
              className="border h-10 w-full rounded-md px-3"
              onChange={(event) => {
                formik.setFieldValue("email", event.target.value);
                setErrorValidation(false);
              }}
            />
            <input
              type="password"
              placeholder="user password"
              className="border h-10 w-full rounded-md px-3"
              onChange={(event) => {
                formik.setFieldValue("password", event.target.value);
                setErrorValidation(false);
              }}
            />
            {errorValidation && (
              <div className="text-sm text-red-600">
                Invalid Email or Password
              </div>
            )}
            <button
              type="submit"
              className="w-full font-semibold p-3 text-white bg-blue-500 rounded-md"
            >
              Log In
            </button>
          </Form>
        </FormikProvider>
        <div>
          Don't have a account?{" "}
          <a href="/signUp" className="text-blue-500">
            {" "}
            SignUp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
