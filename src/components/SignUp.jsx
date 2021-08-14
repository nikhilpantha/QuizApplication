import React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { signupSchema } from "../validationSchema";

const SignUp = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: signupSchema,

    onSubmit: (values) => {
      window.localStorage.setItem("loggedIn", "yes");
      window.localStorage.setItem("email", values.email);
      window.localStorage.setItem("name", values.name);
      window.localStorage.setItem("password", values.password);
      history.push("/");
    },
  });

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-gray-200">
      <div className="w-full sm:w-96 flex flex-col justify-center items-center bg-white p-10 space-y-5 rounded-md">
        <h1 className="flex justify-center text-4xl font-semibold">Sign Up</h1>
        <FormikProvider value={formik}>
          <Form
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            className="space-y-3 w-full"
          >
            <div>
              <input
                name="name"
                type="text"
                placeholder="Name"
                className={`border h-10 w-full rounded-md px-3 focus:outline-none ${
                  formik.errors.name && formik.touched.name && "border-red-400"
                }`}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="text-sm text-red-600 ml-2">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className={`border h-10 w-full rounded-md px-3 focus:outline-none ${
                  formik.errors.email &&
                  formik.touched.email &&
                  "border-red-400"
                }`}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="text-sm text-red-600 ml-2">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className={`border h-10 w-full rounded-md px-3 focus:outline-none ${
                  formik.errors.password &&
                  formik.touched.password &&
                  "border-red-400"
                }`}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="text-sm text-red-600 ml-2">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full font-semibold p-3 text-white bg-blue-500 rounded-md"
            >
              Sign Up
            </button>
          </Form>
        </FormikProvider>
        <div>
          have a account ?{" "}
          <a href="/login" className="text-blue-500">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
