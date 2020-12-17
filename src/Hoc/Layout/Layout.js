import React from 'react';
import MainNavBar from '../../Components/Navbar/Main/index';
import Navbar from '../../Components/Navbar/Navbar';
import Top from '../../Components/Top/Panel/index';

const Layout = (props) => {
    let display = (
        <MainNavBar />
    );
    if (Object.keys(props.user).length !== 0) {
        display = (
            <>
                <Navbar logout={props.logout}/>
                <Top user={props.user} />
            </>
        );
    }
    return (
        <>
            {display}

            <main>{props.children}</main>
        </>
    )
}

export default Layout;