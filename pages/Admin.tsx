import React, { FunctionComponent } from 'react';
import Header from './parts/Header';

type Props = {
    ServerProps: ServerPropsType
}

type Page = {
    name: string
}

const Admin:FunctionComponent<Props> = (props) => {
    return (
        <main>
            <Header serverProps={props.ServerProps}></Header>
            <div></div>
        </main>
    )
}

export default Admin;