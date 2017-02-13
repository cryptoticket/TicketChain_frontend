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
                this.props.submit(values.inn, {number_of_tickets: values.numberOfTickets})
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

    render() {
        const { getFieldDecorator } = this.props.form;
        const {isFetching} = this.props;

        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 }
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
                        {...formItemLayout}
                        label="Кол-во бланков"
                        hasFeedback
                    >
                        {getFieldDecorator(
                            'numberOfTickets',
                            {rules: [{required: true, message: 'Требуется указать кол-во бланков!'}]
                            })(<InputNumber size="default" min={1}/>)
                        }
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="default"
                            loading={isFetching}
                        >
                            Сгенерировать бланки
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

CreateBlanksForm.PropTypes = {
    submit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default Form.create({})(CreateBlanksForm);
