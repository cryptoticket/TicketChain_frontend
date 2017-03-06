import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';

import BlankActions from '../../../actions/blank';
import TicketsTableComponent from './TicketsTableComponent.js';

class TicketPage extends Component {

    componentWillMount() {
        const inn = this.props.location.pathname.split('/')[2];
        if (!this.props.count) {
            this.props.getTicketsCount(inn);
        }
    };

    render() {
        const {tickets, isFetching, routeParams, getTickets, getTicket, count, location, getTicketsCount} = this.props;
        return (
            <Row>
                <Col xs={24} sm={24} md={{span:16, offset:4}} lg={{span:16, offset:4}}>
                    <TicketsTableComponent
                        tickets={tickets}
                        isFetching={isFetching}
                        getTickets={getTickets}
                        getTicket={getTicket}
                        location={location}
                        count={count}
                        getTicketsCount={getTicketsCount}
                        inn={this.props.location.pathname.split('/')[2]}
                    />
                </Col>
            </Row>
        );
    }
}

TicketPage.PropTypes = {
    getTicket: PropTypes.func.isRequired,
    getTickets: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    tickets: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    location: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return ({
        tickets: state.blank.tickets,
        count: state.blank.count,
        isFetching: state.blank.isFetching
    })
};
const mapDispatchToProps = (dispatch) => (bindActionCreators(new BlankActions,dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(TicketPage);