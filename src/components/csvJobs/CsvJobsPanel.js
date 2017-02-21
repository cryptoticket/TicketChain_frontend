import React, {Component, PropTypes} from 'react';

import { Form, Input, InputNumber, Button } from 'antd';

class CsvJobsPanel extends Component {

    render() {
        return (
            <div className="panel">

            </div>
        );
    }
}

CsvJobsPanel.PropTypes = {
    submit: PropTypes.func.isRequired,
    showConfirm: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default CsvJobsPanel;
