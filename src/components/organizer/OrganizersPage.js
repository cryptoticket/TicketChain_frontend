import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';

import BlankActions from '../../actions/blank';

import BatchTableComponent from './OrganizersTableComponent';

class OrganizersPage extends Component {

    componentWillMount() {
        this.props.getOrganizers();
    };

    render() {
        const {organizers, isFetching} = this.props;
        return (
            <Row>
                <Col xs={24} sm={24} md={{span:16, offset:4}} lg={{span:16, offset:4}}>
                    <BatchTableComponent
                        organizers={organizers}
                        isFetching={isFetching}
                    />
                </Col>
            </Row>
        );
    }
}

OrganizersPage.PropTypes = {
    getOrganizers: PropTypes.func.isRequired,
    organizers: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return ({
        organizers: state.blank.organizers,
        isFetching: state.blank.isFetching
    })
};
const mapDispatchToProps = (dispatch) => (bindActionCreators(new BlankActions,dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(OrganizersPage);