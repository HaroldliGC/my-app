import React, { PureComponent} from 'react';
import classNames from 'classnames/bind';
import styles from './Header.css';
import NavLink from './NavLink';
import PropTypes from 'prop-types';
import exitPic from './img/exit.png';
import { Image } from 'react-bootstrap';
import {clearToken} from "../../common/utils";

const cx = classNames.bind(styles);

export default class Header extends PureComponent{
    constructor(props){
        super(props);
        this.handleExit = this.handleExit.bind(this);
    }
    handleExit(){
        clearToken();
        window.location.pathname = "/";
    }
    componentDidMount(){
        this.props.updateCurrentPath();
    }
    render(){
        const currentPath = this.props.path;
        console.log("currentPath:",currentPath)
        const select1 = currentPath === "/BookManagePage";
        const select2 = currentPath === "/UserManagePage";
        const select3 = currentPath === "/BusinessManagePage";
        const select4 = currentPath === "/AnalysisPage";
        return(
            <div>
                <div className={cx({appTitle:true})}>
                Begonia图书管理系统
                </div >
                <div className={cx({headerBar:true})}>
                    <div className={cx({linkArea:true})}>
                        <div
                            className={cx({menuItem: true, navLinkWrapper: true, selectedItem:select1})}
                        >
                            <NavLink
                                title="图书管理界面" filter="BookManagePage"
                            >
                            </NavLink>
                        </div>
                        <div
                            className={cx({menuItem: true, navLinkWrapper: true, selectedItem:select2})}
                        >
                            <NavLink
                                title="用户管理界面" filter="UserManagePage"
                            >
                            </NavLink>
                        </div>
                        <div
                            className={cx({menuItem: true, navLinkWrapper: true, selectedItem:select3})}
                        >
                            <NavLink
                                title="业务管理界面" filter="BusinessManagePage"
                            >
                            </NavLink>
                        </div>
                        <div
                            className={cx({menuItem: true, navLinkWrapper: true, selectedItem:select4})}
                        >
                            <NavLink
                                title="业务分析界面" filter="AnalysisPage"
                            >
                            </NavLink>
                        </div>
                    </div>
                    <div className={cx({functionItemArea:true})}>
                        <div className={cx({userInfItem:true})} onClick={this.handleExit}>
                            <Image src={exitPic}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Header.PropTypes = {
    path: PropTypes.string,
    updateCurrentPath : PropTypes.string,
}