import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Spin, Col } from 'antd';

import BlankActions from '../../actions/blank';

class MainPage extends Component {

    componentWillMount() {
        this.props.getBasicInfo();
    }

    render() {
        const {isFetching, info} = this.props;
        return (
            <div className="panel">
                <Spin tip="Загрузка..." spinning={isFetching}>
                    <Row>
                        <Col span={6}>
                            <p>Eth is enabled:</p>
                        </Col>
                        <Col span={12}>
                            <p>{info.eth_is_enabled ? 'True' : 'False'}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <p>Eth node:</p>
                        </Col>
                        <Col span={12}>
                            <p>{info.eth_node}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <p>Eth main address:</p>
                        </Col>
                        <Col span={12}>
                            <p>{info.eth_main_address}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <p>Eth main account:</p>
                        </Col>
                        <Col span={12}>
                            <p>{info.eth_main_account}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <p>Eth main account link:</p>
                        </Col>
                        <Col span={12}>
                            <p>{info.eth_main_account_link}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <p>Eth balance wei:</p>
                        </Col>
                        <Col span={12}>
                            <p>{info.eth_balance_wei}</p>
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}

MainPage.PropTypes = {
    getBasicInfo: PropTypes.func.isRequired,
    info: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return ({
        info: state.blank.info,
        isFetching: state.blank.isFetching
    })
};
const mapDispatchToProps = (dispatch) => (bindActionCreators(new BlankActions,dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);