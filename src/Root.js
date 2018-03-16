import React, {Component} from "react";
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Header from "./components/Header/Header";
import BookManagePage from "./pages/BookManagePage/containers/BookManagePage";
import UserManagePage from "./pages/UserManagePage/containers/UserManagePage";
import BusinessPage from "./pages/BusinessPage/containers/BusinessPage";

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
                <div>
                <Header path={this.state.currentPath} updateCurrentPath={this.updateCurrentPath}/>
                <Route  exact path="/BookManagePage" component={BookManagePage} />
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