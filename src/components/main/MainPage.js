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
                    <Row style={{paddingBottom: '8px'}}>
                        <Col span={6}>
                            <p>Смарт контракты</p>
                        </Col>
                        <Col span={12}>
                            <p>{Object.keys(info).length ? info.eth_is_enabled ? 'Да' : 'Нет' : null}</p>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom: '8px'}}>
                        <Col span={6}>
                            <p>Ethereum узел</p>
                        </Col>
                        <Col span={12}>
                            <p>{info.eth_node}</p>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom: '8px'}}>
                        <Col span={6}>
                            <p>Основной контракт</p>
                        </Col>
                        <Col span={12}>
                            <a href={info.eth_main_address_link} target="_blank">
                                 {info.eth_main_address}
                            </a>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom: '8px'}}>
                        <Col span={6}>
                            <p>Аккаунт</p>
                        </Col>
                        <Col span={12}>
                            <a href={info.eth_main_account_link} target="_blank">
                                 {info.eth_main_account}
                            </a>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom: '8px'}}>
                        <Col span={6}>
                            <p>Баланс</p>
                        </Col>
                        <Col span={12}>
                            <p>{info.eth_balance_wei} (Wei)</p>
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
