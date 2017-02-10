import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import { Form, Input, InputNumber, Button } from 'antd';

const FormItem = Form.Item;

class CreateBlanksForm extends Component {
    state = {loading: false};

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
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            callback();
            return;
        } else {
            callback('Введите корректный ИНН!');
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {loading} = this.state;

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
                            })(<Input size="default" maxLength="11"/>)
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
                            loading={loading}
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
    submit: PropTypes.func.isRequired
};

export default Form.create({})(CreateBlanksForm);
