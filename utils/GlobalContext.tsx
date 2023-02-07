import { Dispatch, createContext, useReducer, useState } from "react";

export const GlobalContext = createContext<null | StateType[]>(null);
export const GlobalReducer = createContext<null | Dispatch<ActionType>>(null);

enum ActionTypeType {
    ADD = 'add'
}

type StateType = {
    name: string;
    age: number
}

type ActionType = {
    type: ActionTypeType;
    payload?: StateType;
}

const initialState: StateType[] = [
    {name: 'hassan', age: 21},
    {name: 'amira', age: 26},
    {name: 'asmaa', age: 24},
]


export const itemsReducer = (state: StateType[], action: ActionType) => {
    switch(action.type) {
        case ActionTypeType.ADD : {
            return [
                ...state,
                {name: action.payload!.name, age: action.payload!.age}
            ]
        }
        default: return state
       }
}

export default function Provider({ children }: { children: React.ReactNode }) {
    const [items, dispatch] = useReducer(itemsReducer, initialState)
  return (
    <GlobalContext.Provider value={items}>
      <GlobalReducer.Provider value={dispatch}>{children}</GlobalReducer.Provider>
    </GlobalContext.Provider>
  );
}
