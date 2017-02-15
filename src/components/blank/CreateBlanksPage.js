import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';

import BlankActions from '../../actions/blank';

import CreateBlanksForm from './CreateBlanksForm';

class CreateBlanksPage extends Component {

    render() {
        const {createNewBatch, isFetching} = this.props;
        return (
            <Row style={{marginTop: '36px'}}>
                <Col xs={24} sm={24} md={{span:12, offset:6}} lg={{span:12, offset:6}}>
                    <CreateBlanksForm
                        submit={createNewBatch}
                        isFetching={isFetching}
                    />
                </Col>
            </Row>
        );
    }
}

CreateBlanksPage.PropTypes = {
    createNewBatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};


const mapStateToProps = (state) => {
    return ({isFetching: state.blank.isFetching})
};
const mapDispatchToProps = (dispatch) => (bindActionCreators(new BlankActions,dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlanksPage);