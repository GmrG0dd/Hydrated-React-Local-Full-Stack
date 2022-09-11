import React, { FunctionComponent, useRef } from 'react';
import { ServerPropsType } from "../utils/serverProps";
import Header from './parts/Header';

type Props = {
    ServerProps: ServerPropsType
}

const Login:FunctionComponent<Props> = (props) => {
    const userRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    async function postLogin() {
        if( !userRef.current || !passRef.current ) return false;
        const response = await fetch('/user/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userRef.current.value, 
                password: passRef.current.value
            })
        });
    }

    return (
        <main>
            <Header serverProps={props.ServerProps}></Header>
            <form>
                <input ref={userRef} type="text"  placeholder='username' />
                <input ref={passRef} type="text" placeholder='password' />
                <button type='button' onClick={postLogin}>Go</button>
            </form>
        </main>
    );
}

export default Login;