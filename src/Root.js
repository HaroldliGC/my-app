import React, {Component} from "react";
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route} from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './Root.css';
import BookManagePage from "./pages/BookManagePage/containers/BookManagePage";
import UserManagePage from "./pages/UserManagePage/containers/UserManagePage";
import BusinessPage from "./pages/BusinessPage/containers/BusinessPage";
import LoginPage from "./pages/LoginPage/containers/LoginPage";

const cx = classNames.bind(styles);

export default class Root extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPath:'',
        };
        this.updateCurrentPath = this.updateCurrentPath.bind(this);
    }
    updateCurrentPath(){
        const path = window.location.pathname;
        this.setState({ currentPath: path });
    }
    /*
    componentDidMount(){
        this.updateCurrentPath();
    }*/

    render(){
        return(
        <Provider store={this.props.store}>
            <Router>
                <div className={cx({router: true})}>
                <Route exact path="/" component={LoginPage} />
                <Route path="/BookManagePage" component={BookManagePage} />
                <Route path="/UserManagePage" component={UserManagePage}/>
                <Route path="/BusinessManagePage" component={BusinessPage}/>
                </div>
            </Router>
        </Provider>
        ); 
    }
}

Root.PropTypes = {
    store: PropTypes.object.isRequired,
}