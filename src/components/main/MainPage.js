import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router'
import { Col, Row } from 'antd';

class MainPage extends Component {

    render() {
        return (
            <div className="panel main">
                <Row gutter={2} style={{ marginTop: 8 }}>
                    <Col span={12}>
                        <div className="logo">
                            <img src='src/assets/img/chain.jpg'/>
                        </div>
                        <div className="label">
                            <p>TicketChain</p>
                        </div>
                    </Col>
                    <Col span={12} className="menu">
                        <Link to={`/organizers`}><p>Организаторы</p></Link>
                        <Link to={`/new_tickets`}><p>Создание бланков</p></Link>
                    </Col>
                </Row>
            </div>
        );
    }
}

// const mapStateToProps = (state) => ({showUploadPanel: state.showUploadPanel});
// const mapDispatchToProps = (dispatch) => (bindActionCreators(new AuthActions,dispatch));

export default MainPage;