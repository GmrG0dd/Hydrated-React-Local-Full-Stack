import React, { FunctionComponent } from 'react';

type Props = {
    serverProps: ServerPropsType
}

const Header:FunctionComponent<Props>= (props) => {
    return (
        <header id="header">
            {
            (props.serverProps?.isAdmin) ? <>
                <a href='/admin'>Account</a>
                <a href='/user/logout'>Log Out</a>
                <a style={{textDecoration: 'none'}} href='/'><h2>Home</h2></a>
            </> : <>
                <a href='/user/login'>Login</a>
                <a style={{textDecoration: 'none'}} href='/'><h2>Home</h2></a>
            </>
            }
        </header>
    );
}

export default Header;