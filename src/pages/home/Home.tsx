//aka app.js
//aka index.js

import {useState, useRef, useEffect} from 'react';
import Todo from '../../components/Todo/Todo.tsx';
import { db } from '../../firebase.ts'
import {collection, onSnapshot} from '@firebase/firestore';

//function home is function app

interface todo_type {
    todo: string
}

function Home() {

    const [todos, setTodos ] = useState<todo_type[]>([]);

    const input = useRef(null);

    useEffect(() => {
        onSnapshot(collection(db, "todos"), (snapshot: any) => {
            return setTodos(snapshot.docs.map((doc: any) => doc.data()));
        }); 

        return () => {

        }
    }, [])

    const addTodo = (e: any) => {
        e.preventDefault()
        // @ts-ignore
        setTodos([...todos, {'todo': input.current.value}]);
        // @ts-ignore
        input.current.value = ""
    };

    return (
        <div className="App">
            <h2> TODO List App</h2>
            <form>
                <div>
                    <label htmlFor="new_todo">Make Todo</label>
                    <input id="new_todo" className="border-2 rounded ml-2" type="text" ref={input} />
                </div>
                <button className="bg-red-400 p-2 text-white" onClick={addTodo} >Add Todo</button>
            </form>
            <ul>
                {
                    todos.map((todo: todo_type) => (
                        <li key={JSON.stringify(todo)}>
                            {todo['todo']}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Home;

