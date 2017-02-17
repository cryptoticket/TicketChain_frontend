import React, {Component, PropTypes} from 'react';

import { Form, Input} from 'antd';

const FormItem = Form.Item;

class NumberInput extends Component{

    constructor(props) {
        super(props);
        const value = this.props.value || {};
        this.state ={};
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if (nextProps.value) {
            const value = nextProps.value;
            this.setState(value);
        }
    }
    handleInnChange = (e) => {
        let number = e.target.value;
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        if (number && !reg.test(number)) {
            return;
        }
        // if (!('value' in this.props)) {
        //     this.setState({ inn });
        // }
        this.triggerChange({[this.props.field]: number});
    };

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    };

    render() {
        const state = this.state;
        return (
            <Input
                size="default"
                maxLength="6"
                value={state[this.props.field]}
                onChange={this.handleInnChange}
            />
        );
    }
}

export default NumberInput;
