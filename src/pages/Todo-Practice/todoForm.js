import React, { forwardRef, memo } from 'react';
import cn from 'classnames';
import { TodoConsumer } from '../../context/todoContext';

const TodoForm = forwardRef(({ }, ref) => {
  console.log('TodoForm');
  return <TodoConsumer>
    {({ addTodo, addTodoStatus }) => {
      return (
        <div>
          <form className="flex flex-row" onSubmit={addTodo}>
            <div>
              <input ref={ref} type="text" required className="rounded-none px-3 py-2 border text-center border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                placeholder="Enter the task" />
            </div>
            <div>
              <button type="submit" disabled={addTodoStatus?.status === 'REQUEST'}
                className={cn("flex justify-center py-2 px-4 ml-2 border shadow-lg shadow-red-600/150 border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", {
                  "bg-slate-600 text-white pointer-none hover:bg-slate-700 focus:ring-0 focus:ring-offset-0 focus:ring-slate-500": addTodoStatus?.status === 'REQUEST'
                })}>
                {addTodoStatus?.status === 'REQUEST'
                  ? <span>Adding</span>
                  : <span>Add Todo</span>
                }
              </button>
            </div>
          </form>
          {addTodoStatus?.status === 'FAILED' && <h2 className="flex w-full"><span>Failed to add </span> <span className="font-bold ml-1">{ref.current.value}</span></h2>}
        </div>
      )
    }}
  </TodoConsumer>
});

export default memo(TodoForm);