import autoBind from 'react-autobind';
import className from 'classnames/bind';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, HelpBlock} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Field ,reduxForm} from 'redux-form';
import {EDIT_USER ,DETAIL_USER, NEW_USER} from '../../common/OperateKeys';

const validate = values => {
    const errors = {};
    if (!values.Name){
        errors.Name = "姓名不为空";
    }
    if (!values.Account){
        errors.Account = "账号不为空"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Account)){
        errors.Account = "请使用您的邮箱注册账号";
    }
    if (!values.License){
        errors.License = "证件号码不为空";
    } else if(values.License.length !== 18) {
        errors.License = "无效的证件号"
    }
    if (!values.State){
        errors.State = "账号状态不为空";
    }
    if (!values.Identity){
        errors.Identity = "账号类型不为空";
    }
    return errors;
}

const renderField = ({
    input,
    label,
    type,
    disabled,
    meta: {touched, error, warning}
}) => (
    <FormGroup>
        <Col sm={4} componentClass={ControlLabel}>{label}</Col>
        <Col sm={8}>
            <FormControl {...input} disabled={disabled} placeholder={label} type={type}/>
            {touched && error && <HelpBlock ><Glyphicon glyph="exclamation-sign" />{error}</HelpBlock>}
        </Col>
    </FormGroup>
)

const renderFieldSelect = ({
    input,
    label,
    disabled,
    option,
    meta: {touched, error, warning}
}) => (
    <FormGroup>
        <Col sm={4} componentClass={ControlLabel}>{label}</Col>
        <Col sm={8}>
            <FormControl {...input} disabled={disabled} placeholder={option.first} componentClass="select">
                <option value = {option.first}>{option.first}</option>
                <option value = {option.second}>{option.second}</option>
            </FormControl>
            {touched && error && <HelpBlock ><Glyphicon glyph="exclamation-sign" />{error}</HelpBlock>}
        </Col>
    </FormGroup>
)

class SyncValidationForm extends PureComponent {
    render(){
        const {
            inputType
        } = this.props;
        const gender = {first:"man",second:"woman"};
        const state = {first:"normal",second:"stop"}
        const identity = {first:"user",second:"manager"}
        return(
            <Form horizontal>
                <Field
                    name = "Name"
                    type = "text"
                    component = {renderField}
                    label = "姓名"
                    disabled = {inputType === DETAIL_USER ? "disabled" : ""}
                />
                <Field
                    name = "Account"
                    type = "text"
                    component = {renderField}
                    label = "账号"
                    disabled = {inputType === DETAIL_USER ? "disabled" : ""}
                />
                <Field
                    name = "Phone"
                    type = "text"
                    component = {renderField}
                    label = "手机号"
                    disabled = {inputType === DETAIL_USER ? "disabled" : ""}
                />
                {inputType !== NEW_USER ?
                <Field
                    name = "Email"
                    type = "text"
                    component = {renderField}
                    label = "邮箱"
                    disabled = {inputType === DETAIL_USER ? "disabled" : ""}
                /> : ''}
                <Field
                    name = "License"
                    type = "text"
                    component = {renderField}
                    label = "证件号"
                    disabled = {inputType === DETAIL_USER ? "disabled" : ""}
                />
                <Field
                    name = "Gender"
                    component = {renderFieldSelect}
                    label = "性别"
                    option = {gender}
                    disabled = {inputType === DETAIL_USER ? "disabled" : ""}
                />
                <Field
                    name = "State"
                    component = {renderFieldSelect}
                    label = "状态"
                    option = {state}
                    disabled = {inputType === DETAIL_USER ? "disabled" : ""}
                />
                <Field
                    name = "Identity"
                    component = {renderFieldSelect}
                    label = "身份"
                    option = {identity}
                    disabled = {inputType === DETAIL_USER ? "disabled" : ""}
                />
                
            </Form>
        )
   }
}
const fields = ['Name','Account','State','Gender','Phone','Email','License','Identity'];

SyncValidationForm.PropTypes = {
    inputType : PropTypes.string,
}

const reduxInputForm = reduxForm({
    form: 'SyncValidationForm',
    getFormState: (state) => (state.present.OperateReaderUser.form),
    validate,
    fields,
})(SyncValidationForm);

export default connect((state) => ({
    initialValues: state.present.OperateReaderUser.initFormData
}),null,null,{withRef: true})(reduxInputForm);