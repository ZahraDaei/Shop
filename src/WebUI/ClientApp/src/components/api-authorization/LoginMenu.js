import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import { TbLogin } from "react-icons/tb";
import { RiArrowDropDownFill } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    // authenticatedView(userName, profilePath, logoutPath) {
    //     return (<Fragment>
    //         <NavItem>
    //             <NavLink tag={Link} className="text-dark" to={profilePath}>Hello {userName}</NavLink>
    //         </NavItem>
    //         <NavItem>
    //             <NavLink tag={Link} className="text-dark" to={logoutPath}>Logout</NavLink>
    //         </NavItem>
    //     </Fragment>);

    // }

    // anonymousView(registerPath, loginPath) {
    //     return (<Fragment>
    //         <NavItem>
    //             <NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>
    //         </NavItem>
    //         <NavItem>
    //             <NavLink tag={Link} className="text-dark" to={loginPath}>Login</NavLink>
    //         </NavItem>
    //     </Fragment>);
    // }
    authenticatedView(userName, profilePath, logoutPath) {
        return (
            <Fragment>
                <span className="pointer profileShower">
                    {" "}
                    <HiOutlineUser size={20} />
                    <RiArrowDropDownFill size={20} />
                </span>
                <div className="hideProfile">

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Link to="/profile">{userName}</Link>
                        <span className="pointer">
                            {" "}
                            <TbLogout className="ml-1" size={20} />
                            <Link to={logoutPath}>خروج از حساب کاربری</Link>
                        </span>
                    </div>

                </div>
            </Fragment>
        );

    }

    // {userAuthentication ? (<>
    //   <span className="pointer profileShower">
    //     {" "}
    //     <HiOutlineUser size={20} />
    //     <RiArrowDropDownFill size={20} />
    //   </span>
    //   <div className="hideProfile">
    //     {!loadingUser?<div style={{ display: "flex", flexDirection: "column" }}>
    //       <Link to="/profile">{user.userName}</Link>
    //       <Link to={ApplicationPaths.LogOut}>خروج از حساب کاربری</Link>
    //     </div>:null}
    //   </div>
    // </>
    // ) : (
    //   <div className="loginBox  flex_row">
    //     <TbLogin size={25} />
    //     <div className="mr-1">
    //       <Link to={ApplicationPaths.Login}>ورود | ثبت نام</Link>
    //     </div>
    //   </div>
    // )}



    anonymousView(registerPath, loginPath) {
        return (<Fragment>
            <div className="loginBox  flex_row">
                <TbLogin size={25} />
                <div className="mr-1">
                    <Link to={loginPath}>ورود | ثبت نام</Link>
                </div>
            </div>
        </Fragment>);
    }
}
