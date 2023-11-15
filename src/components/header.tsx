import { useNavigate } from "react-router-dom";
import { getStateContext } from "../context/stateProvider";
import { auth } from "../firebase/database";
import {toast} from 'react-toastify'
import { actionType } from "../context/reducer";

const header = () => {
	const [{user}, dispatch] = getStateContext()
	const navigate = useNavigate()
  return (
    <nav className="bg-gray-900 w-full flex py-3 justify-between items-center mx-auto px-8">
      <h1 className="text-lg font-bold tracking-wide">ChatMingle 
				<span className="text-sm font-semibold tracking-wider text-gray-400 capitalize"> [ {user?.username} ]</span>
			</h1>
			<button onClick={() => {
				auth.signOut().then(() => {
					toast.success("Successfully logout.")
					dispatch({
						type: actionType.SET_USER,
						user: null
					})
					navigate('/login')
				})
				.catch(() => {
					toast.error("something went wrong!")
				})
			}} className="p-2 border border-gray-500 rounded px-7 hover:bg-gray-700">Logout</button>
    </nav>
  );
};

export default header;
