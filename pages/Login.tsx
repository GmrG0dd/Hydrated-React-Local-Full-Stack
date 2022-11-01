import React, { FunctionComponent, useRef, useState } from 'react';
import { hydrateRoot } from 'react-dom/client';
import Header from './parts/Header';

type Props = {
    ServerProps: ServerPropsType
}

const Login:FunctionComponent<Props> = (props) => {
    const userRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [fakeLink, setFakeLink] = useState<string>('register');

    async function postLogin() {
        if( !userRef.current || !passRef.current ) return false;
        console.log(fakeLink);
        if( fakeLink == 'login' ) {
            const response = await fetch('/user/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userRef.current.value, 
                    password: passRef.current.value
                })
            });
        } else {
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
            console.log(response);
            if((await response.json()).body) window.location.href = '/admin';
        }
    }

    function reverseFakeLink() {
        fakeLink == 'register' ? setFakeLink('login') : setFakeLink('register');
    }

    return (<>
        <Header serverProps={props.ServerProps}></Header>
        <main>
            <form>
                <input ref={userRef} type="text" placeholder='Username' />
                <input ref={passRef} type="text" placeholder='Password' />
                <p onClick={reverseFakeLink}>{fakeLink}</p>
                <button type='button' onClick={postLogin}>Go</button>
            </form>
        </main>
    </>);
}

if (typeof window !== 'undefined') {
    hydrateRoot( document.getElementById('root') as HTMLElement, <Login ServerProps={window.ServerProps}/> );
}

export default Login;