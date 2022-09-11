import React, { FunctionComponent } from 'react';
import { ServerPropsType } from "./serverProps";
import Header from './Header';

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