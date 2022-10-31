import React, { FunctionComponent } from 'react';
import Header from './parts/Header';

type Props = {
    ServerProps: ServerPropsType
}

const Admin:FunctionComponent<Props> = (props) => {
    return (<>
        <Header serverProps={props.ServerProps}></Header>
        <main>
            <h1>Hi Admin &#40;;</h1>
        </main>
    </>);
}

export default Admin;