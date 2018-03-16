import React, { PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './NavLink.css';
const cx = classNames.bind(styles);

export default class NavLink extends PureComponent{
    render(){
        const {title,filter} = this.props;
        return(
            <Link 
                className={cx({navLink:true})}
                to = {filter}
            >
            {title}
            </Link>
        )
    }
}
NavLink.PropTypes = {
    title : PropTypes.string,
    filter: PropTypes.string,
}