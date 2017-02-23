import React, {Component, PropTypes} from 'react';

import { Form, Input} from 'antd';

const FormItem = Form.Item;

class OgrnInput extends Component{

    constructor(props) {
        super(props);
        const value = this.props.value || {};
        this.state = {
            inn: value.inn
        }
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if (nextProps.value) {
            const value = nextProps.value;
            this.setState(value);
        }
    }
    handleInnChange = (e) => {
        const inn = e.target.value;
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;

        if (inn && !reg.test(inn)) {
            return;
        }

        this.triggerChange({inn});
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
                maxLength="12"
                value={state.inn}
                onChange={this.handleInnChange}
            />
        );
    }
}

export default OgrnInput;
