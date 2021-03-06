import React, { PureComponent} from 'react';
import classNames from 'classnames/bind';
import styles from './SearchBox.css';
import PropTypes from 'prop-types';
import {Panel} from 'react-bootstrap';

const cx = classNames.bind(styles);

export default class SearchBox extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            open:false,
        };
    }
    handleClick(event){
        const valueLength = this.props.itemIds.length;
        var value = "";
        let data = "?";
        for (let i=0; i<valueLength; i++){
            value = encodeURIComponent(document.getElementById(this.props.Title+this.props.itemIds[i]).value);
            data = data + this.props.itemIds[i] + "=" + value +"&";
        }
        let newData = data.slice(0,data.length-1);
        const url = newData;
        this.props.search(url);
    }
    render(){
        const {itemIds,itemNames,Title} = this.props;
        var inputList = [];
        const length = itemIds.length;
        for (let i=1; i<length; i++){
            inputList.push(
                <div>
                    <input
                        id={Title+itemIds[i]}
                        className={cx({searchInput:true})}
                        typr="text" placeholder={itemNames[i]}
                    ></input>
                </div>
            );
        }
        return(
            <div>
                <div className={cx({searchGroup:true})}>
                    <div className={cx({search:true})}>
                        <input 
                            id = {Title+itemIds[0]}
                            className={cx({searchInputMain:true})}
                            type="tetx" placeholder={itemNames[0]}
                        ></input>
                    </div>
                    <div>
                        <button 
                            className={cx({searchButton:true})}
                            onClick={(e)=>this.handleClick(e)} 
                        >检索</button>
                    </div>
                    <div>
                        <a 
                            className={cx({searchSetting:true})}
                            onClick={() => this.setState({ open: !this.state.open })}
                        >高级检索设置</a>
                    </div>    
                </div>
                <Panel expanded={this.state.open} bsClass={cx({searchPanel:true})}>
                <Panel.Collapse>
                    <Panel.Body>
                        <div className={cx({searchGroup:true})}>
                            {inputList}
                        </div>
                    </Panel.Body>
                </Panel.Collapse>
                </Panel>
            </div>
        )
    }
}

SearchBox.PropTypes = {
    search : PropTypes.func,
    itemIds : PropTypes.array,
    itemNames:PropTypes.array,
    Title : PropTypes.string,
}