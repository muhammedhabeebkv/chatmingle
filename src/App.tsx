import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Chat, Login } from "./pages";
import { getStateContext } from "./context/stateProvider";
import { InitialState } from "./context/initialState";
import { actionType } from "./context/reducer";
import { auth } from "./firebase/database";
import { getSpecificDataWithWhere } from "./firebase/model";

import "react-toastify/dist/ReactToastify.css";
import { COLLECTION } from "./firebase/collections";
import { Loading } from "./components";

function App() {
  const [{ user }, dispatch]: [{ user: { username: string; email: string; uid: string } }, dispatch: ({}: Partial<InitialState>) => any] = getStateContext();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (user) {
      setLoading(false);
      navigate("/chat");
    } else {
      auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
          getSpecificDataWithWhere(COLLECTION.USERS, "uid", "==", currentUser.uid)
            .then((responseFromFirebase) => {
              dispatch({
                type: actionType.SET_USER,
                user: responseFromFirebase.docs[0].data(),
              });
            })
            .catch((error) => {
              toast.error(error.code);
            });
          navigate("/chat");
        } else {
          navigate("/login");
        }
        setLoading(false);
      });
    }
  }, []);
  return (
    <>
      {loading && <Loading />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Chat" element={<Chat />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
