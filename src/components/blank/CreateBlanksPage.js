import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Modal } from 'antd';

const confirm = Modal.confirm;

import BlankActions from '../../actions/blank';
import CreateBlanksForm from './CreateBlanksForm';

class CreateBlanksPage extends Component {

    showConfirm = () => {
        const {createNewBatch, newBatch} = this.props;
        confirm({
            title: 'Сгенерировать 16 бланков?',
            okText: 'Ок',
            cancelText: 'Отмена',
            onOk: () =>  {
                createNewBatch(newBatch.inn, newBatch);
            },
            onCancel() {},
        });
    };

    render() {
        const {createNewBatch, getTicketCount, isFetching} = this.props;
        return (
            <Row style={{marginTop: '36px'}}>
                <Col xs={24} sm={24} md={{span:12, offset:6}} lg={{span:12, offset:6}}>
                    <CreateBlanksForm
                        submit={getTicketCount}
                        showConfirm={this.showConfirm}
                        isFetching={isFetching}
                    />
                </Col>
            </Row>
        );
    }
}

CreateBlanksPage.PropTypes = {
    createNewBatch: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlanksPage);