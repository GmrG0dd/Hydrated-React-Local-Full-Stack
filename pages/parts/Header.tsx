import React, { FunctionComponent, useState } from 'react';

type Props = {
    serverProps: ServerPropsType
}

const Header:FunctionComponent<Props>= (props) => {
    const [seconds, setSeconds] = useState<number>(0);
    setInterval(() => {setSeconds(seconds+1)}, 1000);

    var links;

    if(props.serverProps?.isAdmin){
        links = <>
            <a href='/admin'>Account</a>
            <a style={{textDecoration: 'none'}} href='/'><h2>Home</h2></a>
            <a href='/user/logout'>Log Out</a>
        </>;
    } else {
        links = <>
            <a href='/user/login'>Login</a>
            <a style={{textDecoration: 'none'}} href='/'><h2>Home</h2></a>
            <a href='/user/register'>Register</a>
        </>;
    }

    return (
        <header id="header">
            {links}
        </header>
    );
}

export default Header;