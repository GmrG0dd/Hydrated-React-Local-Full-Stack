import React, { FunctionComponent } from 'react';
import { hydrateRoot } from 'react-dom/client';
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

if (typeof window !== 'undefined') {
    hydrateRoot( document.getElementById('root') as HTMLElement, <Admin ServerProps={window.ServerProps}/> );
}

export default Admin;