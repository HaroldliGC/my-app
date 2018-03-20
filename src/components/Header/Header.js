import React, { PureComponent} from 'react';
import classNames from 'classnames/bind';
import styles from './Header.css';
import NavLink from './NavLink';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

export default class Header extends PureComponent{
    componentDidMount(){
        this.props.updateCurrentPath();
    }
    render(){
        const currentPath = this.props.path;
        console.log("currentPath:",currentPath)
        const select1 = currentPath === "/BookManagePage";
        const select2 = currentPath === "/UserManagePage";
        const select3 = currentPath === "/BusinessManagePage";
        return(
            <div>
                <div 
                    className={cx({appTitle:true})}
                >
                Begonia图书管理系统
                </div >
                <div className={cx({headerBar:true})}>
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
                </div>
            </div>
        )
    }
}

Header.PropTypes = {
    path: PropTypes.string,
    updateCurrentPath : PropTypes.string,
}