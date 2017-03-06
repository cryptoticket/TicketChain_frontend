import React, {Component, PropTypes} from 'react';

import { Form, Input, InputNumber, Button, Upload, Icon, Popover, Switch } from 'antd';

import NumberInput from './NumberInput';

const FormItem = Form.Item;

class CreateCsvForm extends Component {
    state = {};

    checkInn = (rule, value, callback) => {
        if (value && value.inn && (value.inn.length === 12 || value.inn.length === 10)) {
            callback();
            return;
        } else {
            callback('Введите корректный ИНН!');
        }
    };

    createNewCSV = (data) => {
        this.props.createNewCSV(this.props.form.getFieldValue('inn').inn, data, this.state.isBlocking);
        return Promise.reject();
    };

    handleSwitch = () => {
        this.setState({isBlocking: true});
    };

    render() {
        const { getFieldDecorator, getFieldError, getFieldValue} = this.props.form;
        const {isFetching} = this.props;

        const formItemLayout = {
            labelCol: { span: 12 },
            wrapperCol: { span: 8 }
        };
        const formItemLayoutShort = {
            labelCol: { span: 12 },
            wrapperCol: { span: 4 }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 12,
                offset: 12
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
                            {rules: [{required: true, message: 'Требуется ввести ИНН!'}, {validator: this.checkInn}],
                            })(<NumberInput field='inn' maxLength="12"/>)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayoutShort}
                        label="Обработать файл мгновенно"
                    >
                        <Switch defaultChecked={false} onChange={this.handleSwitch} size="default"/>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <div>
                            {getFieldValue('inn') && !getFieldError('inn') ?
                                <Upload
                                    beforeUpload={this.createNewCSV}
                                >
                                    <Button
                                        style={{marginTop: '12px'}}
                                        size="default"
                                        loading={isFetching}
                                    >
                                        {!isFetching ?  <Icon type="upload" /> : ' '} Загрузить файл
                                    </Button>
                                </Upload> :
                                <Popover
                                    content="Требуется ввести ИНН"
                                    placement="rightTop"
                                >

                                    <Button
                                        style={{marginTop: '12px'}}
                                        size="default"
                                        disabled
                                    >
                                        <Icon type="upload" /> Загрузить файл
                                    </Button>
                                </Popover>
                            }
                        </div>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

CreateCsvForm.PropTypes = {
    submit: PropTypes.func.isRequired,
    showConfirm: PropTypes.func.isRequired,
    createNewCSV: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default Form.create({})(CreateCsvForm);
