import React, { FunctionComponent } from 'react';
import { ServerPropsType } from "../utils/serverProps";
import Header from './parts/Header';

type Props = {
    ServerProps: ServerPropsType
}

const App:FunctionComponent<Props> = (props) => {
    return (
        <main>
            <Header serverProps={props.ServerProps}></Header>
        </main>
    );
}

export default App;