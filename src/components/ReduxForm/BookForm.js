import autoBind from 'react-autobind';
import className from 'classnames/bind';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, HelpBlock} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Field ,reduxForm} from 'redux-form';
import {NEW_BOOK, EDIT_BOOK, DETAIL_BOOK, DELETE_BOOK} from '../../common/OperateKeys';
import styles from './BookPanel.css';

const cx = className.bind(styles);

const validate = values => {
    const errors = {};
    if (!values.Isbn) {
        errors.Isbn = "国际标准书号不为空";
    }
    if (!values.Name) {
        errors.Name = "书名不为空";
    }
    return errors;
}

const renderField = ({
    input,
    label,
    type,
    componentClass,
    disabled,
    meta: {touched, error, warning}
}) => (
    <FormGroup>
        <Col sm={4} componentClass={ControlLabel}>{label}</Col>
        <Col sm={8}>
            <FormControl {...input} disabled={disabled} placeholder={label} type={type} componentClass={componentClass}/>
            {touched && error && <HelpBlock className={cx({helpBlock: true})}><Glyphicon glyph="exclamation-sign" />{error}</HelpBlock>}
        </Col>
    </FormGroup>
)

class SyncValidationForm extends PureComponent {
    render(){

        const {
            inputType,
        } = this.props;

        return(
            <Form horizontal>
                <Field
                    name = "Isbn"
                    type = "text"
                    component = {renderField}
                    label = "国际标准书号"
                    componentClass = "input"
                    disabled = {inputType === DETAIL_BOOK ? "disabled" : ""}
                />
                <Field
                    name = "Name"
                    type = "text"
                    component = {renderField}
                    label = "书名"
                    componentClass = "input"
                    disabled = {inputType === DETAIL_BOOK ? "disabled" : ""}
                />
                <Field
                    name = "Author"
                    type = "text"
                    component = {renderField}
                    label = "作者"
                    componentClass = "input"
                    disabled = {inputType === DETAIL_BOOK ? "disabled" : ""}
                />
                <Field
                    name = "Type"
                    type = "text"
                    component = {renderField}
                    label = "分类"
                    componentClass = "input"
                    disabled = {inputType === DETAIL_BOOK ? "disabled" : ""}
                />
                <Field
                    name = "Press"
                    type = "text"
                    component = {renderField}
                    label = "出版社"
                    componentClass = "input"
                    disabled = {inputType === DETAIL_BOOK ? "disabled" : ""}
                />
                <Field
                    name = "Number"
                    type = "number"
                    component = {renderField}
                    label = "书籍总量"
                    componentClass = "input"
                    disabled = {inputType === DETAIL_BOOK ? "disabled" : ""}
                />
                {inputType !== NEW_BOOK ?
                <Field
                    name = "BorrowNumber"
                    type = "number"
                    component = {renderField}
                    label = "借出数量"
                    componentClass = "input"
                    disabled = {inputType === DETAIL_BOOK ? "disabled" : ""}
                />:''}
                <Field
                    name = "Price"
                    type = "number"
                    component = {renderField}
                    label = "标准价格"
                    componentClass = "input"
                    disabled = {inputType === DETAIL_BOOK ? "disabled" : ""}
                />
                <Field
                    name = "Info"
                    type = "textarea"
                    component = {renderField}
                    label = "书籍信息"
                    componentClass = "textarea"
                    disabled = {inputType === DETAIL_BOOK ? "disabled" : ""}
                />
            </Form>
        )
    }
}

const fields = ['Isbn','Name','Author','Type','Press','Number','BorrowNumber','Price','Info'];

SyncValidationForm.PropTypes = {
    inputType : PropTypes.string,
}

const reduxInputForm = reduxForm({
    form: 'SyncValidationForm',
    getFormState: (state) => (state.present.OperateBook.form),
    validate,
    fields,
})(SyncValidationForm);

export default connect((state) => ({
    initialValues: state.present.OperateBook.initFormData
}),null,null,{withRef: true})(reduxInputForm);