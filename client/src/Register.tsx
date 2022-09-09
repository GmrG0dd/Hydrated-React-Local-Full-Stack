import React, { FunctionComponent, useRef } from 'react';
import Header from './Header';

const Register:FunctionComponent = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    
    async function postSubmit() {
        if( !userRef.current || !passRef.current ) return false;
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
    }

    return (
        <main>
            <Header></Header>
            <form>
                <input ref={userRef} type="text"  placeholder='username' />
                <input ref={passRef} type="text" placeholder='password' />
                <button type='button' onClick={postSubmit}>Go</button>
            </form>
        </main>
    );
}

export default Register;