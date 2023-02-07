import { useReducer, useContext, useState } from "react";

import { GlobalContext, GlobalReducer } from "@/utils/GlobalContext";

// enum ListActionKind  {
//     ADD = 'ADD'
// }

// interface CountAction {
//     type: ListActionKind,
//     payload?: {
//         name: string,
//         age: number
//     }
// }

// type state = {
//     name: string,
//     age: number
// }

// const initialState: state[] = [
//     {name: 'hassan', age: 21},
//     {name: 'amira', age: 26},
//     {name: 'asmaa', age: 24},
// ]

// const listReducer = (state: state[], action: CountAction) => {
//    switch(action.type) {
//     case ListActionKind.ADD : {
//         return [
//             ...state,
//             {name: action.payload!.name, age: action.payload!.age}
//         ]
//     }
//     default: return state
//    }
// }

// type AppProps = {
//     onStyle: () => void
// }

export default function Main() {
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    // const [list, dispatch] = useReducer(listReducer, initialState)
    const items = useContext(GlobalContext)
    const dispatch = useContext(GlobalReducer)

    const listItems = items!.map(item => 
            <li key={item.age} >{item.name}</li>
        )

        enum ActionTypeType {
            ADD = 'add'
        }

        const submitFormHandler = (e: React.SyntheticEvent) => {
            e.preventDefault()
            dispatch!({type: ActionTypeType.ADD, payload: {name: name, age: age}})
        }

    return (
        <div className="p-4 flex flex-col gap-4">
        <ul className="cursor-pointer">
            {listItems}
        </ul>
        <form onSubmit={submitFormHandler}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border-2 border-black" />
        <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value))} className="border-2 border-black" />
        <button>submit</button>
        </form>
        <div dangerouslySetInnerHTML={{__html: '<h2>this is h2</h2>'}}></div>
        </div>
    )
}