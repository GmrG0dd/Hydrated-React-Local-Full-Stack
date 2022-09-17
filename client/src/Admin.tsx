import React, { FunctionComponent } from 'react';
import { ServerPropsType } from "./serverProps";
import Header from './Header';
import PagesButton from './PagesButton';

type Props = {
    ServerProps: ServerPropsType
}

type Page = {
    name: string
}

const Admin:FunctionComponent<Props> = (props) => {
    const pages:Page[] = [{name: 'bruh'}, {name: 'bruh'}, {name: 'bruh'}, {name: 'bruh'}, {name: 'bruh'}, {name: 'bruh'}, {name: 'bruh'}, {name: 'bruh'}];

    return (
        <main>
            <Header serverProps={props.ServerProps} ></Header>
            <div className='PagesWrapper'>
                {pages.map((page, i) => { return(
                    <PagesButton name={page.name} id={i}  />
                )})}
            </div>
        </main>
    )
}

export default Admin;