import React, { FunctionComponent, useState } from 'react';
import { ServerPropsType } from "../../utils/serverProps";

type Props = {
    serverProps: ServerPropsType
}

const Header:FunctionComponent<Props>= (props) => {
    const [seconds, setSeconds] = useState<number>(0);
    setInterval(() => {setSeconds(seconds+1)}, 1000);

    var links;

    if(props.serverProps.isAdmin){
        links = (<div>
            <a href='/'>Home</a>
            <a href='/admin'>Account</a>
        </div>);
    } else {
        links = (<div>
            <a href='/'>Home</a>
            <a href='/user/login'>Login</a>
            <a href='/user/register'>Register</a>
        </div>);
    }

    return (
        <header id="header">
            <p>{''+seconds}</p>
            {links}
        </header>
    );
}

export default Header;