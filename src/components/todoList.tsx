import React, { memo } from 'react';
import { Todo } from '../models/todo';

type Props = {
    list: Todo[],
    removeTodo: (id: number) => void
};

const TodoList = ({ list, removeTodo }: Props) => {
    console.log('List render');

    return <table>
        <tbody>
            {list.map((todo, index) => {
                return (
                    <tr key={index}>
                        <td>{todo.id}. </td>
                        <td>{todo.name}</td>
                        <td><button type="button" onClick={() => removeTodo(todo.id)}>Remove</button></td>
                    </tr>
                )
            })}
        </tbody>
    </table>;
};

TodoList.displayName = 'TodoList';

export default memo(TodoList);
