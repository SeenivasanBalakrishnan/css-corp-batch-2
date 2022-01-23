import React, { memo } from 'react';

type Props = {};

const Child1 = (props: Props) => {
    console.log('Child 1 render')
    return <div>This is Child 1</div>;
};


export default memo(Child1)