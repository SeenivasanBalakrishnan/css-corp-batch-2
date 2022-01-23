import React, { forwardRef, memo } from 'react';

type Props = {
    addTodo: () => void
};

const Form = forwardRef<HTMLInputElement, Props>(({ addTodo }, ref) => {
    console.log('Form render');

    return <form action='#' >
        <input type="text" ref={ref} />
        <button type='button' onClick={addTodo}>Add Todo</button>
        <br /><br /><br />
    </form>;
});

Form.displayName = 'Form';

export default memo(Form);