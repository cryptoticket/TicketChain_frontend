import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';

import BlankActions from '../../../actions/blank';
import TicketPanelComponent from './TicketPanelComponent';

class TicketPage extends Component {

    componentWillMount() {
        this.props.getTicket(this.props.routeParams.inn, this.props.routeParams.id);
    };

    render() {
        const {ticket, isFetching, routeParams, sellTicket, cancelTicket, editTicket, handleTicket} = this.props;
        return (
            <Row style={{marginTop: '36px'}}>
                <Col span={24}>
                    <TicketPanelComponent
                        ticket={ticket}
                        isFetching={isFetching}
                        inn={routeParams.inn}
                        sellTicket={sellTicket}
                        cancelTicket={cancelTicket}
                        editTicket={editTicket}
                        handleTicket={handleTicket}
                    />
                </Col>
            </Row>
        );
    }
}

TicketPage.PropTypes = {
    getTicket: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    sellTicket: PropTypes.func.isRequired,
    cancelTicket: PropTypes.func.isRequired,
    editTicket: PropTypes.func.isRequired,
    handleTicket: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return ({
        ticket: state.blank.ticket,
        isFetching: state.blank.isFetching
    })
};
const mapDispatchToProps = (dispatch) => (bindActionCreators(new BlankActions,dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(TicketPage);