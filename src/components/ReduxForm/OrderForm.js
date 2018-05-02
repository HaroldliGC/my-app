import className from 'classnames/bind';
import PropTypes from 'prop-types';
import moment from 'moment';
import React, {PureComponent} from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, HelpBlock} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {DETAIL_ORDER} from '../../common/OperateKeys';
import styles from './BookPanel.css';

const cx = className.bind(styles);

const validate = values => {
    const errors = {};
    if (!values.Isbn){
        errors.Isbn = "国际标准书号不为空";
    }
    if (!values.License){
        errors.License = "用户证件号不为空";
    }
    if (!values.startDate){
        errors.startDate = "开始日不能为空";
    }
    if (!values.endDate){
        errors.endDate = "预计归还日不能为空";
    }
    //时间判断
    if (values.startDate && values.endDate){
        let startDateSeed = '';
        if (typeof values.startDate === 'string'){
            startDateSeed = values.startDate;
        } else {
            startDateSeed = `${values.startDate.getFullYear()}-${values.startDate.getMonth() + 1}-${values.startDate.getDate()}`;
        }
            const startDateValue = moment(startDateSeed);
            const endDateValue = moment(values.endDate);
        if (startDateValue > endDateValue){
            errors.endDate = '开始日不能大于预计归还日';
        }
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
            {touched && error && <HelpBlock className={cx({helpBlock: true})}><Glyphicon glyph="exclamation-sign" />{error}</HelpBlock>}
        </Col>
    </FormGroup>
)

class SyncValidationForm extends PureComponent {
    render(){
        const {
            inputType
        } = this.props;
        return(
            <Form horizontal>
            <Field
                name = "Isbn"
                type = "text"
                component = {renderField}
                label = "国际标准书号"
                disabled = {inputType === DETAIL_ORDER ? "disabled" : ""}
            />
            <Field
                name = "License"
                type = "text"
                component = {renderField}
                label = "证件号"
                disabled = {inputType === DETAIL_ORDER ? "disabled" : ""}
            />
            <Field
                name = "startDate"
                type = "date"
                component = {renderField}
                label = "开始日"
                disabled = {inputType === DETAIL_ORDER ? "disabled" : ""}
            />
            <Field
                name = "endDate"
                type = "date"
                component = {renderField}
                label = "预计归还日"
                disabled = {inputType === DETAIL_ORDER ? "disabled" : ""}
            />
                
        </Form>
        )
    }
}



const fields = ['Isbn', 'Id', 'License', 'startDate', 'endDate'];

SyncValidationForm.PropTypes = {
    inputType : PropTypes.string,
}

const reduxInputForm = reduxForm({
    form: 'SyncValidationForm',
    getFormState: (state) => (state.present.OperateOrder.form),
    validate,
    fields,
})(SyncValidationForm);

export default connect((state) => ({
    initialValues: state.present.OperateOrder.initFormData
}),null,null,{withRef: true})(reduxInputForm);