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
            <div style={{marginLeft: '25%', marginRight:'25%', marginTop: '40px'}}>
                <Spin tip="Загрузка..." spinning={isFetching}>
                    <Row style={{paddingBottom: '32px'}}>
                        <Col span={8}>
                            <p style={{textAlign: 'right', paddingRight: '20px'}}>Смарт контракты</p>
                        </Col>
                        <Col span={15}>
                            <p style={{textAlign: 'center', borderBottom: '2px solid #dcdcdc'}}>
                                {Object.keys(info).length ? info.eth_is_enabled ? 'Да' : 'Нет' : null}
                            </p>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom: '32px'}}>
                        <Col span={8}>
                            <p style={{textAlign: 'right', paddingRight: '20px'}}>
                                Ethereum узел
                            </p>
                        </Col>
                        <Col span={15}>
                            <p style={{textAlign: 'center', borderBottom: '2px solid #dcdcdc'}}>
                                <a href={info.eth_node} target="_blank">
                                    {info.eth_node}
                                </a>
                            </p>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom: '32px'}}>
                        <Col span={8}>
                            <p style={{textAlign: 'right', paddingRight: '20px'}}>
                                Основной контракт
                            </p>
                        </Col>
                        <Col span={15}>
                            <p style={{textAlign: 'center', borderBottom: '2px solid #dcdcdc'}}>
                                <a  href={info.eth_main_address_link} target="_blank">
                                     {info.eth_main_address}
                                </a>
                            </p>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom: '32px'}}>
                        <Col span={8}>
                            <p style={{textAlign: 'right', paddingRight: '20px'}}>
                                Аккаунт
                            </p>
                        </Col>
                        <Col span={15}>
                            <p style={{textAlign: 'center', borderBottom: '2px solid #dcdcdc'}}>
                                <a href={info.eth_main_account_link} target="_blank">
                                    {info.eth_main_account}
                                </a>
                            </p>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom: '32px'}}>
                        <Col span={8}>
                            <p style={{textAlign: 'right', paddingRight: '20px'}}>
                                Баланс
                            </p>
                        </Col>
                        <Col span={15}>
                            <p style={{textAlign: 'center', borderBottom: '2px solid #dcdcdc'}}>
                                {info.eth_balance_wei ? `${info.eth_balance_wei} (Wei)` : null}
                            </p>
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
