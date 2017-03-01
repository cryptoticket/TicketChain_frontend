import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';

import BlankActions from '../../../actions/blank';
import StatsPanel from './StatsPanel';

class StatsPage extends Component {

    componentWillMount() {
        this.props.getStats(this.props.routeParams.inn);
    };

    render() {
        const {stats, isFetching, routeParams} = this.props;
        return (
            <Row>
                <Col xs={24} sm={24} md={{span:12, offset:6}} lg={{span:12, offset:6}}>
                    <StatsPanel
                        stats={stats}
                        isFetching={isFetching}
                        inn={routeParams.inn}
                    />
                </Col>
            </Row>
        );
    }
}

StatsPage.PropTypes = {
    getStats: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};


const mapStateToProps = (state) => {
    return ({
        isFetching: state.blank.isFetching,
        stats: state.blank.stats
    })
};
const mapDispatchToProps = (dispatch) => (bindActionCreators(new BlankActions,dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);