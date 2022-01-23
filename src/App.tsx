import React, { memo, useCallback, useRef, useState } from 'react';
import Form from './components/form';
import TodoList from './components/todoList';
import { Todo } from "./models/todo";

const App = () => {
    const [list, setList] = useState<Todo[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const addTodo: () => void = useCallback(() => {
        const text: string = inputRef.current ? inputRef.current?.value : '';
        if (text.length > 0) {
            setList((cList) => [...cList, { name: text, id: cList.length + 1 }]);
            if (inputRef?.current)
                inputRef.current.value = '';
        }
    }, []);

    const removeTodo: (id: number) => void = useCallback((todoId: number) => {
        setList((cList) => cList.filter(todo => todo.id != todoId));
    }, []);

    console.log('App render');

    return (
        <div>
            <h1>My To Do's</h1>
            <Form ref={inputRef} addTodo={addTodo} />
            {list.length ? <TodoList list={list} removeTodo={removeTodo} /> : 'No record found'}
        </div>
    )
}

export default memo(App);