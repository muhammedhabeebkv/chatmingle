import { InitialState } from "./initialState"

export const actionType = {
	SET_USER: "SET_USER"
}

const reducer = (state: (string|number)[], action: InitialState): any => {
	switch(action.type){
		case actionType.SET_USER: 
			return {
				...state,
				user: action.user
			}
		default:
			return state
	}
}

export default reducer;