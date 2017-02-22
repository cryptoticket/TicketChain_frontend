import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Modal } from 'antd';

const confirm = Modal.confirm;

import BlankActions from '../../../actions/blank';
import CsvJobsPanel from './CsvJobsPanel';

class CsvJobsPage extends Component {

    componentWillMount() {
        this.props.getCsvJobById(this.props.routeParams.inn, this.props.routeParams.jobId);
    };

    render() {
        const {csvJob, isFetching, routeParams} = this.props;
        return (
            <Row style={{marginTop: '36px'}}>
                <Col xs={24} sm={24} md={{span:12, offset:6}} lg={{span:12, offset:6}}>
                    <CsvJobsPanel
                        csvJob={csvJob}
                        isFetching={isFetching}
                        inn={routeParams.inn}
                    />
                </Col>
            </Row>
        );
    }
}

CsvJobsPage.PropTypes = {
    getCsvJobById: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};


const mapStateToProps = (state) => {
    return ({
        isFetching: state.blank.isFetching,
        csvJob: state.blank.csvJob
    })
};
const mapDispatchToProps = (dispatch) => (bindActionCreators(new BlankActions,dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(CsvJobsPage);