import React, {Component, PropTypes} from 'react';
import { Row, Col, Table, Spin, Button } from 'antd';

const { Column, ColumnGroup } = Table;

class TicketPanelComponent extends Component {

    sellTicket = () => {
        this.props.sellTicket(this.props.inn, this.props.ticket)
    };

    cancelTicket = () => {
        this.props.cancelTicket(this.props.inn,this.props.ticket)
    };

    editTicket = () => {
        this.props.editTicket(this.props.inn, this.props.ticket)
    };

    render() {
        const {ticket, inn, isFetching} = this.props;
        return (
            <Spin tip="Загрузка..." spinning={isFetching}>
                <div className="panel">
                    <Row gutter={2} style={{ marginTop: 8 }}>
                        <Col span={8}>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Серийный номер</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.serial_number: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>ID</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.id: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Статус</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.state: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Дата создания</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? moment(ticket.created_date).format('L'): null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Цена</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.price_rub: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Бумажный билет</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? (ticket.is_paper_ticket ? 'Да' : 'Нет') : null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Покупатель</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.buyer_name: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Дата покупки</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? moment(ticket.buying_date).format('L') : null}</span>
                                </Col>
                            </Row>

                        </Col>
                        <Col span={8}>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Эмиттер</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.issuer: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>ИНН</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.issuer_inn: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>ОГРН</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.issuer_ogrn: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>ОГРНИП</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.issuer_ogrnip: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Адрес</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.issuer_address: null}</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Мероприятие</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.event_title: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Место проведения</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.event_place_title: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Дата</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? moment(ticket.event_date).format('L'): null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Адресс</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.event_place_address: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Ряд</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.row: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Место</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.seat: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Категория билета</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.ticket_category: null}</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row gutter={2} style={{ marginTop: 16 }}>
                        <Col span={8}>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Организатор</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.organizer: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>ИНН</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.organizer_inn: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>ОГРН</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.organizer_ogrn: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>ОГРНИП</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.organizer_ogrnip: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Адрес</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.organizer_address: null}</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Продавец</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.seller: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>ИНН</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.seller_inn: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>ОГРН</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.seller_ogrn: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>ОГРНИП</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.seller_ogrnip: null}</span>
                                </Col>
                            </Row>
                            <Row gutter={2} style={{ marginTop: 8 }}>
                                <Col span={8}>
                                    <span>Адрес</span>
                                </Col>
                                <Col span={6}>
                                    <span>{ticket ? ticket.seller_address: null}</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8} >
                            <div style={{marginTop: '116px'}}>
                                {ticket.status === 'created' ?
                                    <Button
                                        style={{marginRight: '8px'}}
                                        type="primary"
                                        size="default"
                                        onClick={this.sellTicket}
                                    >
                                        Продать билет
                                    </Button> :
                                    <Button
                                        style={{marginRight: '8px'}}
                                        type="primary"
                                        size="default"
                                        onClick={this.editTicket}
                                    >
                                        Сохранить
                                    </Button>
                                }
                                <Button
                                    type="primary"
                                    size="default"
                                    onClick={this.cancelTicket}
                                >
                                    Забраковать
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Spin>
        );
    }
}

TicketPanelComponent.PropTypes = {
    ticket: PropTypes.object.isRequired,
    inn: PropTypes.number.isRequired,
    sellTicket: PropTypes.func.isRequired,
    cancelTicket: PropTypes.func.isRequired,
    editTicket: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,

};

export default TicketPanelComponent;