import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import { Form, Input, InputNumber, Button } from 'antd';

const FormItem = Form.Item;

class CreateBlanksForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.submit(values, this.props.showConfirm)
            }
        });
    };

    checkInn = (rule, value, callback) => {
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if (reg.test(value) && value.length === 10 || isNaN(value)) {
            callback();
            return;
        } else {
            callback('Введите корректный ИНН!');
        }
    };

    checkStartSeries = (rule, value, callback) => {
        const form = this.props.form;
        const reg = /[^А-Я]/;
        if (value && (value.length !== 2 || reg.test(value))) {
            callback('Введите начало серии (две буквы кириллицы заглавными)');
        } else {
            callback();
        }
    };

    checkEndSeries = (rule, value, callback) => {
        const form = this.props.form;
        const reg = /[^А-Я]/;
        if (value && (value.length !== 2 || reg.test(value))) {
            callback('Введите конец серии (две буквы кириллицы заглавными)');
        } else {
            callback();
        }
    };

    checkStartNumber = (rule, value, callback) => {
        const form = this.props.form;
        const reg = /[^0-9]/;
        if (value && (value.length !== 6 || reg.test(value))) {
            callback('Введите начало номера (6 цифр)');
        } else {
            callback();
        }
    };

    checkEndNumber = (rule, value, callback) => {
        const form = this.props.form;
        const reg = /[^0-9]/;
        if (value && (value.length !== 6 || reg.test(value))) {
            callback('Введите конец номера (6 цифр)');
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {isFetching} = this.props;

        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 }
        };
        const formItemLayoutShort = {
            labelCol: { span: 8 },
            wrapperCol: { span: 6 }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 12,
                offset: 8
            },
        };

        return (
            <div className="panel">
                <Form onSubmit={this.handleSubmit} style={{paddingTop: '20px'}}>
                    <FormItem
                        {...formItemLayout}
                        label="ИНН организатора"
                        hasFeedback
                    >
                        {getFieldDecorator(
                            'inn',
                            {rules: [{required: true, message: 'Требуется ввести ИНН!'},
                                {validator: this.checkInn}
                            ]
                            })(<Input size="default" maxLength="10"/>)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayoutShort}
                        label="Начало - Серия"
                        hasFeedback
                    >
                        {getFieldDecorator(
                            'start_series',
                            {rules: [{required: true, message: 'Требуется ввести начало серии!'},
                                {validator: this.checkStartSeries}
                            ]
                            })(<Input size="default" maxLength="10"/>)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayoutShort}
                        label="Начало - Номер"
                        hasFeedback
                    >
                        {getFieldDecorator(
                            'start_number',
                            {rules: [{required: true, message: 'Требуется ввести начало номера!'},
                                {validator: this.checkStartNumber}
                            ]
                            })(<Input size="default" maxLength="10"/>)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayoutShort}
                        label="Конец - Серия"
                        hasFeedback
                    >
                        {getFieldDecorator(
                            'end_series',
                            {rules: [{required: true, message: 'Требуется ввести конец серии!'},
                                {validator: this.checkEndSeries}
                            ]
                            })(<Input size="default" maxLength="10"/>)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayoutShort}
                        label="Конец - Номер"
                        hasFeedback
                    >
                        {getFieldDecorator(
                            'end_number',
                            {rules: [{required: true, message: 'Требуется ввести конец номера!'},
                                {validator: this.checkEndNumber}
                            ]
                            })(<Input size="default" maxLength="10"/>)
                        }
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="default"
                                loading={isFetching}
                            >
                                Сгенерировать бланки
                            </Button>
                        </div>
                        <div>
                            <Button
                                style={{marginTop: '12px'}}
                                disabled
                                type="submit"
                                htmlType="submit"
                                size="default"
                                loading={isFetching}
                            >
                                Сгенерировать из CSV файла
                            </Button>
                        </div>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

CreateBlanksForm.PropTypes = {
    submit: PropTypes.func.isRequired,
    showConfirm: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default Form.create({})(CreateBlanksForm);
