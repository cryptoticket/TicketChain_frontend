import React, {Component, PropTypes} from 'react';

import { Form, Input, Button, Icon } from 'antd';

import SeriesInput from '../blank/SeriesInput';
import NumberInput from '../blank/NumberInput';

const FormItem = Form.Item;

class CreateBlanksByNumForm extends Component {
    state = {};

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let data = {};
                Object.keys(values).forEach(p => (data[p] = values[p][p]));
                data.end_series = data.start_series;
                this.props.submit(data, this.props.showConfirm)
            }
        });
    };

    checkInn = (rule, value, callback) => {
        if (value && value.inn && (value.inn.length === 12 || value.inn.length === 10)) {
            callback();
            return;
        } else {
            callback('Введите корректный ИНН!');
        }
    };

    checkStartSeries = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value.start_series && value.start_series.length !== 2) {
            callback('Введите серию!');
        } else {
            callback();
        }
    };

    handleSwitch = () => {
        this.setState({isBlocking: true});
    };

    render() {
        const { getFieldDecorator, getFieldError, getFieldValue} = this.props.form;
        const {isFetching} = this.props;

        const formItemLayout = {
            labelCol: { span: 11 },
            wrapperCol: { span: 8 }
        };
        const formItemLayoutShort = {
            labelCol: { span: 11 },
            wrapperCol: { span: 4 }
        };
        const tailHintItemLayout = {
            wrapperCol: {
                span: 12,
                offset: 11
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 12,
                offset: 7
            },
        };

        return (
            <Form onSubmit={this.handleSubmit} style={{paddingTop: '20px'}}>
                <FormItem
                    {...formItemLayout}
                    label="ИНН организатора"
                    hasFeedback
                >
                    {getFieldDecorator(
                        'inn',
                        {rules: [{required: true, message: 'Требуется ввести ИНН!'}, {validator: this.checkInn}],
                        })(<NumberInput field='inn' maxLength="12"/>)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Серия"
                    hasFeedback
                >
                    {getFieldDecorator(
                        'start_series',
                        {rules: [{required: true, message: 'Требуется ввести серию!'},
                            {validator: this.checkStartSeries}
                        ]
                        })(<SeriesInput field='start_series'/>)
                    }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Количество"
                    hasFeedback
                >
                    {getFieldDecorator(
                        'quantity',
                        {rules: [{required: true, message: 'Требуется ввести количество!'}]
                        })(<NumberInput field='quantity' maxLength="5"/>)
                    }
                </FormItem>
                <FormItem {...tailHintItemLayout}>
                    <span className="comment">* - поле обязательное для заполнения</span>
                </FormItem>
                <div style={{padding: '70px', margin: '0 auto', textAlign: 'center'}}>
                    <Button
                        htmlType="submit"
                        size="default"
                        loading={isFetching}
                    >
                        Сгенерировать бланки
                    </Button>
                </div>
            </Form>
        );
    }
}

CreateBlanksByNumForm.PropTypes = {
    submit: PropTypes.func.isRequired,
    showConfirm: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default Form.create({})(CreateBlanksByNumForm);
