import React from 'react'

interface StateProviderProps {
	reducer: (state: any , action: any) => any;
	initialState: any;
	children: React.ReactNode
}

export const StateContext = React.createContext({});

export const StateProvider: React.FC<StateProviderProps> = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={React.useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}


export const getStateContext: any = () => React.useContext(StateContext)