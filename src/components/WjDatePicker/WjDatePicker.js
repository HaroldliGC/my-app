import _ from 'lodash';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import classNames from 'classnames/bind';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import styles from './WjDatePicker.css';

const cx = classNames.bind(styles);
const wijmo = window.wijmo;
const shouldUpdateCallBacks = ['valueChanged', 'gotFocus', 'lostFocus', 'textChanged'];

/**
 * 对wijmo Input的一个简单React化封装 默认是DatePicker控件 实际上Input控件都可以使用
 */

class WjDatePicker extends Component{

  static defaultProps = {
    controlType: wijmo.input.InputDate,
    usedInForm: false,
    mixedCalendar: false,
    format: 'yyyy/MM/dd'
  }

  static propTypes = {
    controlType: PropTypes.func.isRequired,
    initialValue: PropTypes.any,
    name: PropTypes.string,
    usedInForm: PropTypes.bool,
    mixedCalendar: PropTypes.bool,
    format: PropTypes.string,
    textChanged: PropTypes.func,
    //shikelong add 2017年1月17日14:25:16 添加value value可以多次渲染initialValue只能在componentDidMount之后初始化一次。
    //如果同时提供了initialValue/value属性 initialValue优先 建议只使用一种
    value: PropTypes.oneOfType([PropTypes.instanceOf(Date), null])
  }

  constructor(props){
    super(props);
    autoBind(this);
  }

  componentDidMount(){
    this.initComponent(this.props.controlType, this.props.initialValue);
  }

  shouldComponentUpdate(nextProps){
    return this.update(nextProps);
  }

  componentWillUnmount(){
    this.getControl().dispose();
  }

  handleMixCalendarTextChange(sender){
    const isJanpaneseYearRegExp = /^[A-Za-z]/;
    if (sender.text && sender.text.length === 1){
      const isJanpaneseYear = isJanpaneseYearRegExp.test(sender.text);
      sender.mask = isJanpaneseYear ? 'a00/00/00' : '0000/00/00';
    } else if (!sender.text || /^[_/]+$/.test(sender.text)){
      //避免从a00到0000转向的时候 无法输入数字
      sender.mask = '';
      sender.text = '';
    }
    if (_.isFunction(this.props.textChanged)){
      this.props.textChanged(sender);
    }
  }

  formatPropsForMixedCalendar(props){
    props.textChanged = this.handleMixCalendarTextChange;
    props.format = 'gee/MM/dd';
    delete props.mask;
  }

  initComponent(controlType, initialValue){
    const host = ReactDOM.findDOMNode(this.wjContainer), control = new controlType(host), cprops = this.props;
    const props = {};
    for (const prop in cprops){
      if (prop in control && prop !== 'value'){
        props[prop] = cprops[prop];
      } else {
        // assign property to host element
        switch (prop){
          case 'className':
            wijmo.addClass(host, cprops.className);
            break;
          case 'style':
            wijmo.setCss(host, cprops.style);
            break;
          default:
            if (host[prop] !== null){
              host[prop] = cprops[prop];
            }
            break;
        }
      }
    }

    if (_.get(cprops, 'controlType', null) === wijmo.input.InputDate && _.get(cprops, 'mask', undefined) === undefined){
      props.mask = '0000/00/00';
    }

    if (cprops.mixedCalendar){
      this.formatPropsForMixedCalendar(props);
    }

    // shadow copy the array type props - itemsSource & columns
    control.initialize(props);
    if (cprops.initialValue || cprops.initialValue === null){
      control.value = cprops.initialValue;
    } else if ('value' in cprops && (cprops.value || cprops.value === null)){
      control.value = cprops.value;
    }

    // fire initialize event
    if (wijmo.isFunction(cprops.initialized)){
      cprops.initialized(control);
    }
    if (this.props.name && !this.props.usedInForm){
      control.inputElement.name = this.props.name;
    }
  }

  setValue(value){
    if (value === null || value instanceof Date){
      this.getControl().value = value;
    }
  }

  update(nextProps){
    const ctl = this.getControl();
    let isValueChanged = false;
    const formattedNextprops = {...nextProps};
    if (formattedNextprops.mixedCalendar){
      this.formatPropsForMixedCalendar(formattedNextprops);
    }
    for (const prop in formattedNextprops){
      const value = formattedNextprops[prop];
      if (prop === 'value' && !this._sameValue(this.props[prop], value)){
        isValueChanged = true;
      }
      if (prop in ctl && !this._sameValue(ctl[prop], value) && wijmo.isPrimitive(value)){
        ctl[prop] = value;
      }
    }

    shouldUpdateCallBacks.forEach((callBackName) => {
      if (!this._sameValue(this.props[callBackName], formattedNextprops[callBackName])){
        ctl[callBackName].removeAllHandlers();
        ctl[callBackName].addHandler(formattedNextprops[callBackName]);
      }
    });

    if (formattedNextprops.name && !formattedNextprops.usedInForm){
      ctl.inputElement.name = formattedNextprops.name;
    }
    return isValueChanged;
  }

  _update(){
    this.component[this.prop] = this.control[this.prop];
  }

  /**
   * 进行深度比较
   */
  _sameValue(v1, v2){
    return _.isEqual(v1, v2);
  }

  /**
   * 获取wjimo控件实例
   * @return {[type]} [description]
   */
  getControl(){
    const host = ReactDOM.findDOMNode(this.wjContainer);
    return wijmo.Control.getControl(host);
  }


  render(){
    const {value, usedInForm, name} = this.props;
    let inputValue;
    if (_.isDate(value)){
      inputValue = value.toISOString();
    } else {
      inputValue = '';
    }
    return (
      <div
        className={cx({WjDatePickerHost: true})}
        ref={(c) => {
          this.wjContainer = c;
        }}
      >
        {usedInForm && <input
          type="hidden"
          value={inputValue}
          name={name}
        />}
      </div>
    );
  }
}

export default WjDatePicker;
