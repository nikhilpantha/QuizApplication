import React from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(1, "Too week!").required("Required"),
});

const SignUp = () => {
  let usedEmail = true;
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,

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
                className={`border h-10 w-full rounded-md px-3 ${
                  formik.errors.name && formik.touched.name && "border-red-400"
                }`}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="border h-10 w-full rounded-md px-3"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {usedEmail ? (
              <>
                {formik.errors.email && formik.touched.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </>
            ) : (
              <div>email already used</div>
            )}
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="border h-10 w-full rounded-md px-3"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
            <button
              type="submit"
              className="w-full font-semibold p-3 text-white bg-blue-500 rounded-md"
            >
              Sign Up
            </button>
          </Form>
        </FormikProvider>
        <div>
          have a account?{" "}
          <a href="/login" className="text-blue-500">
            {" "}
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
