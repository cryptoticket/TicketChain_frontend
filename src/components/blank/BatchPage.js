import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';

import BlankActions from '../../actions/blank';

import CreateBlanksForm from './CreateBlanksForm';

class CreateBlanksPage extends Component {

    render() {
        const {createNewBatch} = this.props;
        return (
            <Row style={{marginTop: '36px'}}>
                <Col span={12} offset={6}>
                    <CreateBlanksForm submit={createNewBatch} />
                </Col>
            </Row>
        );
    }
}

CreateBlanksPage.PropTypes = {
    createNewBatch: PropTypes.func.isRequired
};

// const mapStateToProps = (state) => ({showUploadPanel: state.showUploadPanel});
const mapDispatchToProps = (dispatch) => (bindActionCreators(new BlankActions,dispatch));

export default connect(undefined, mapDispatchToProps)(CreateBlanksPage);