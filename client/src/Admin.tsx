import React, { FunctionComponent } from 'react';
import { ServerPropsType } from "./serverProps";
import Header from './Header';

type Props = {
    ServerProps: ServerPropsType
}

const Admin:FunctionComponent<Props> = (props) => {
    return (
        <main>
            <Header serverProps={props.ServerProps} ></Header>
            hi user
        </main>
    )
}

export default Admin;