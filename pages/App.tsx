import React, { FunctionComponent } from 'react';
import Header from './parts/Header';

type Props = {
    ServerProps: ServerPropsType
};

const App:FunctionComponent<Props> = (props) => {
    return (<>
        <Header serverProps={props.ServerProps}></Header>
        <main>
            <h1>Your stuff goes here...</h1>
        </main>
    </>)
}

export default App;