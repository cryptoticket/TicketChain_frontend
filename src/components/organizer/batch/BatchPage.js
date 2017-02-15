import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';

import BlankActions from '../../../actions/blank';

import BatchTableComponent from './BatchTableComponent';

class BatchPage extends Component {

    componentWillMount() {
        this.props.getBatch(this.props.routeParams.inn, this.props.routeParams.id);
    };

    render() {
        const {batch, routeParams, isFetching} = this.props;
        return (
            <Row style={{marginTop: '36px'}}>
                <Col  xs={24} sm={24} md={{span:12, offset:6}} lg={{span:12, offset:6}}>
                    <BatchTableComponent
                        batch={batch}
                        inn={routeParams.inn}
                        isFetching={isFetching}
                    />
                </Col>
            </Row>
        );
    }
}

BatchPage.PropTypes = {
    getBatch: PropTypes.func.isRequired,
    batch: PropTypes.array.isRequired,
    routeParams: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return ({
        batch: state.blank.batch,
        isFetching: state.blank.isFetching
    })
};
const mapDispatchToProps = (dispatch) => (bindActionCreators(new BlankActions,dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(BatchPage);