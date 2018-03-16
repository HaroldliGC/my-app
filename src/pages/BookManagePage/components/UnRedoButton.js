import React, {Component} from "react";
import PropTypes from 'prop-types';
import "../CSS/App.css";

export default class UnRedoButton extends Component {
    constructor(props){
        super(props);
        this.handleUndo = this.handleUndo.bind(this);
        this.handleRedo = this.handleRedo.bind(this);
    }
    handleUndo(){
        this.props.Undo();
    }
    handleRedo(){
        this.props.Redo();
    }
    render(){
        let undoButton = "disabled";
        let redoButton = "disabled";
        if (this.props.pastLength>0){
            undoButton = "";
        }
        if (this.props.futureLength>0){
            redoButton = "";
        }

        return(
            <React.Fragment>
            <button className="functionButton" onClick={this.handleUndo} disabled={undoButton}>撤销</button>
            <button className="functionButton" onClick={this.handleRedo} disabled={redoButton}>重做</button>
            </React.Fragment>
        )
    }
}

UnRedoButton.PropTypes = {
    Undo : PropTypes.func,
    Redo : PropTypes.func,
    pastLength : PropTypes.number,
    futureLength : PropTypes.number,
}