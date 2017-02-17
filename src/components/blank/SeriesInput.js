import React, {Component, PropTypes} from 'react';

import { Form, Input} from 'antd';

const FormItem = Form.Item;

class SeriesInput extends Component{

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
        let series = e.target.value;
        const reg = /[^А-я]/;
        if (series && reg.test(series)) {
            return;
        }
        // if (!('value' in this.props)) {
        //     this.setState({ inn });
        // }
        series = series.toUpperCase();
        this.triggerChange({[this.props.field]: series});
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
                maxLength="2"
                value={state[this.props.field]}
                onChange={this.handleInnChange}
            />
        );
    }
}

export default SeriesInput;
