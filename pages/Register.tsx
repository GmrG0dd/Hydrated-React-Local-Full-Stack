import React, { FunctionComponent, useRef, useState } from 'react';
import Header from './parts/Header';

type Props = {
    ServerProps: ServerPropsType
}

let userLength = 0, passLength = 0;
let userFocus = false, passFocus = false;
let userHover = false, passHover = false;

const Register:FunctionComponent<Props> = (props) => {
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

    const inputStyles = [ {borderColor: 'var(--green)'}, {borderColor: 'var(--yellow)'}, {borderColor: 'var(--red)'} ];
    const [userStyle, setUserStyle] = useState(inputStyles[2]);
    const [passStyle, setPassStyle] = useState(inputStyles[2]);

    function checkState(index:number) {
        if(index == 0 && userRef.current) userLength = userRef.current.value.length;
        if(index == 1 && passRef.current) passLength = passRef.current.value.length;
        adjustStyle();
    }
    function checkFocus(eventType:string, index:number) {
        if(index == 0 && eventType == 'focus') userFocus = true;
        if(index == 0 && eventType == 'blur') userFocus = false;
        if(index == 1 && eventType == 'focus') passFocus = true;
        if(index == 1 && eventType == 'blur') passFocus = false;
        adjustStyle();
    }
    function checkMouse(eventType:string, index:number){
        if(index == 0 && eventType == 'mouseover') userHover = true;
        if(index == 0 && eventType == 'mouseout') userHover = false;
        if(index == 1 && eventType == 'mouseover') passHover = true;
        if(index == 1 && eventType == 'mouseout') passHover = false;
        adjustStyle();
    }

    function adjustStyle(){
        if(userLength > 0) {
            setUserStyle(inputStyles[0]);
        } else {
            if(userFocus) setUserStyle(inputStyles[1]);
            else userHover ? setUserStyle(inputStyles[1]) : setUserStyle(inputStyles[2]);
        }
        if(passLength > 0 ) {
            setPassStyle(inputStyles[0]);
        } else {
            if(passFocus) setPassStyle(inputStyles[1]);
            else passHover ? setPassStyle(inputStyles[1]) : setPassStyle(inputStyles[2]);
        }
    }

    return (<>
        <Header serverProps={props.ServerProps}></Header>
        <main>
            <form>
                <input ref={userRef} type="text" style={userStyle} onMouseOver={e => {checkMouse(e.type, 0)}}  onMouseOut={e => {checkMouse(e.type, 0)}} onFocus={e => {checkFocus(e.type, 0)}} onBlur={e => {checkFocus(e.type, 0)}} onChange={() => {checkState(0)}} placeholder='Username' />

                <input ref={passRef} type="text" style={passStyle} onMouseOver={e => {checkMouse(e.type, 1)}} onMouseOut={e => {checkMouse(e.type, 1)}} onFocus={e => {checkFocus(e.type, 1)}} onBlur={e => {checkFocus(e.type, 1)}} onChange={() => {checkState(1)}} placeholder='Password' />

                <a href='/user/login'>Login</a>
                <button type='button' onClick={postSubmit}>Go</button>
            </form>
        </main>
    </>);
}

export default Register;