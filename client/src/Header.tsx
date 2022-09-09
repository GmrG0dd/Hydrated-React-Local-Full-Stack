import React, { FunctionComponent, useState } from 'react';

const Header:FunctionComponent = () => {
    const [seconds, setSeconds] = useState<number>(0);
    setInterval(() => {setSeconds(seconds+1)}, 1000);

    return (
        <header id="header">
            <p>{''+seconds}</p>
            <div>
                <a href='/'>Home</a>
                <a href='/admin'>Admin</a>
                <a href='/user/login'>Login</a>
                <a href='/user/register'>Register</a>
            </div>
        </header>
    );
}

export default Header;