import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InitialState } from "../context/initialState";
import { getStateContext } from "../context/stateProvider";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/database";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { toast } from "react-toastify";
import { actionType } from "../context/reducer";

const login = () => {
  const [{ user }, dispatch]: [{ user: { username: string; email: string; uid: string } }, dispatch: ({}: Partial<InitialState>) => any] = getStateContext();
  const navigate = useNavigate()
  React.useEffect(() => {
    if(user){
      navigate('/chat')
    }
  }, [])
  const [forgotBtn, setForgotBtn] = React.useState<boolean>(false);
  return (
    <section className="relative flex flex-col items-center pt-9 w-screen h-screen bg-gray-200 dark:bg-gray-800 text-gray-700">
      <h1 className="font-bold text-2xl dark:text-gray-500">Welcome Back :)</h1>
      {!forgotBtn ? (
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email().required("required!"),
            password: Yup.string().required("required!"),
          })}
          onSubmit={(values, { resetForm }) => {
            const email = values?.email
            const password = values?.password

            signInWithEmailAndPassword(auth, email, password).then(data => {
              if(data){
                toast.success("You are logged in.")
                resetForm
                // console.log(data.providerId[0])
                dispatch({
                  type: actionType.SET_USER,
                  user: {
                    email: data.user?.email,
                  }
                })
                navigate('/chat')
              }
            })
            .catch(error => {
              toast.error(error?.code ?? "Something went wrong!")
            })
          }}
        >
          {({values, errors, touched, handleBlur, handleChange, handleSubmit}) => (
            <form onSubmit={handleSubmit} className="flex flex-col bg-white dark:bg-gray-900 rounded shadow-lg p-12 mt-12">
              <label className="font-semibold text-xs dark:text-gray-500" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
                className="flex items-center h-12 px-4 w-64 bg-gray-200 dark:bg-gray-800 dark:text-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
              />
							{errors.email && touched.email && <p className="text-xs font-semibold text-red-500 ml-2 mt-2">{errors.email}</p>}
              <label className="font-semibold text-xs mt-3 dark:text-gray-500" htmlFor="password">
                password
              </label>
              <input
                type="password"
                name="password"
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
                className="flex items-center h-12 px-4 w-64 bg-gray-200 dark:bg-gray-800 dark:text-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
              />
              <button className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">Login</button>
              <div className="flex mt-6 justify-center text-xs">
                <a className="text-blue-400 hover:text-blue-500 cursor-pointer" onClick={() => setForgotBtn(true)}>
                  Forgot Password
                </a>
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <form className="flex flex-col bg-white dark:bg-gray-900 rounded shadow-lg p-12 mt-12">
          <label className="font-semibold text-xs dark:text-gray-500" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="flex items-center h-12 px-4 w-64 bg-gray-200 dark:bg-gray-800 dark:text-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          />
          <button className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">Send</button>
          <div className="flex mt-6 justify-center text-xs">
            <a className="text-blue-400 hover:text-blue-500 cursor-pointer" onClick={() => setForgotBtn(false)}>
              Login
            </a>
          </div>
        </form>
      )}
    </section>
  );
};

export default login;
