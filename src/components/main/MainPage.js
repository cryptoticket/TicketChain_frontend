import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router'
import { Col, Row } from 'antd';

class MainPage extends Component {

    render() {
        return (
            <div className="panel main">
                <Row gutter={2} style={{ marginTop: 8 }}>
                    <Col xs={24} sm={12} md={12} lg={12}>
                        <div className="label">
                            <p>TicketChain</p>
                        </div>
                    </Col>
                    {/*<Col xs={24} sm={12} md={12} lg={12} className="menu">*/}
                        {/*<Link to={`/organizers`}><p>Организаторы</p></Link>*/}
                        {/*<Link to={`/new_tickets`}><p>Создание бланков</p></Link>*/}
                    {/*</Col>*/}
                </Row>
            </div>
        );
    }
}

// const mapStateToProps = (state) => ({showUploadPanel: state.showUploadPanel});
// const mapDispatchToProps = (dispatch) => (bindActionCreators(new AuthActions,dispatch));

export default MainPage;