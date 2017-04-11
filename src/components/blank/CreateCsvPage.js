import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Modal } from 'antd';

const confirm = Modal.confirm;

import BlankActions from '../../actions/blank';
import CreateCsvForm from './CreateCsvForm';

class CreateCsvPage extends Component {

    showConfirm = () => {
        const {createNewBatch, newBatch, ticketCount} = this.props;
        const title = `Сгенерировать ${ticketCount} ` +
            (ticketCount === 1 ? `бланк?`:
                ticketCount === 2 || ticketCount === 3 || ticketCount === 4 ? `бланка` :
                    `бланков`);
        confirm({
            title,
            okText: 'Ок',
            cancelText: 'Отмена',
            onOk: () =>  {
                createNewBatch(newBatch.inn, newBatch);
            },
            onCancel() {},
        });
    };

    render() {
        const {createNewBatch, getTicketCount, isFetching,createNewCSV} = this.props;
        return (
            <Row>
                <Col xs={24} sm={24} md={{span:16, offset:4}} lg={{span:16, offset:4}}>
                    <CreateCsvForm
                        submit={getTicketCount}
                        showConfirm={this.showConfirm}
                        createNewCSV={createNewCSV}
                        isFetching={isFetching}
                    />
                </Col>
            </Row>
        );
    }
}

CreateCsvPage.PropTypes = {
    createNewBatch: PropTypes.func.isRequired,
    createNewCSV: PropTypes.func.isRequired,
    getTicketCount: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    ticketCount: PropTypes.number.isRequired
};


const mapStateToProps = (state) => {
    return ({
        isFetching: state.blank.isFetching,
        ticketCount: state.blank.ticketCount,
        newBatch: state.blank.newBatch
    })
};
const mapDispatchToProps = (dispatch) => (bindActionCreators(new BlankActions,dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(CreateCsvPage);