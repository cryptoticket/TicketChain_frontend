import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Row, Col, Modal } from 'antd';

const confirm = Modal.confirm;

import BlankActions from '../../../actions/blank';
import CsvJobsPanel from './CsvJobsPanel';

const csvJobScheduler = (action) => {
    action(true);
    const interval = setInterval(() => action(), 3000);
    window.interval = interval;
};

class CsvJobsPage extends Component {

    componentWillMount() {
        csvJobScheduler((isPending) =>
            this.props.getCsvJobById(this.props.routeParams.inn, this.props.routeParams.jobId, isPending, this.props.location.query.blocking))
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.csvJob.status === "ready"){
            clearInterval(interval);
            if(!nextProps.csvJob.collisions.length && !nextProps.csvJob.errors.length) {
                browserHistory.push(`/organizers/${this.props.routeParams.inn}/batches/${nextProps.csvJob.batch_id}`);
            }
        }
    };

    componentWillUnmount() {
        clearInterval(interval);
    };

    render() {
        const {csvJob, isFetching, routeParams} = this.props;
        return (
            <Row>
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