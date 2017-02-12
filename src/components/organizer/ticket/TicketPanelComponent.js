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

    getRow = (label, value) =>
        <Row gutter={2} style={{ marginTop: 8 }}>
            <Col span={10} style={{ textAlign: 'right' }}>
                <h4>{label}:&nbsp;</h4>
            </Col>
            <Col span={14}>
                <span>{this.props.ticket ? value: null}</span>
            </Col>
        </Row>;

    render() {
        const {ticket, inn, isFetching} = this.props;
        return (
            <Spin tip="Загрузка..." spinning={isFetching}>
                <div className="panel">
                    <Row gutter={2}>
                        <Col span={8}>
                            {this.getRow('Серийный номер', ticket.serial_number)}
                            {this.getRow('ID', ticket.id)}
                            {this.getRow('Статус', ticket.state)}
                            {this.getRow('Дата создания', ticket.created_date)}
                            {this.getRow('Цена', ticket.price_rub)}
                            {this.getRow('Бумажный билет', ticket.is_paper_ticket ? 'Да' : 'Нет')}
                            {this.getRow('Покупатель', ticket.buyer_name)}
                            {this.getRow('Дата покупки', moment(ticket.buying_date).format('L'))}
                        </Col>
                        <Col span={8}>
                            {this.getRow('Эмиттер', ticket.issuer)}
                            {this.getRow('ИНН', ticket.issuer_inn)}
                            {this.getRow('ОГРН', ticket.issuer_ogrn)}
                            {this.getRow('ОГРНИП', ticket.issuer_ogrnip)}
                            {this.getRow('Адрес', ticket.issuer_address)}
                        </Col>
                        <Col span={8}>
                            {this.getRow('Мероприятие', ticket.event_title)}
                            {this.getRow('Место проведения', ticket.event_title)}
                            {this.getRow('Дата', moment(ticket.event_date).format('L'))}
                            {this.getRow('Адрес', ticket.event_place_address)}
                            {this.getRow('Ряд', ticket.row)}
                            {this.getRow('Место', ticket.seat)}
                            {this.getRow('Категория билета', ticket.ticket_category)}
                        </Col>
                    </Row>
                    <Row gutter={2} style={{ marginTop: 16 }}>
                        <Col span={8}>
                            {this.getRow('Организатор', ticket.organizer)}
                            {this.getRow('ИНН', ticket.organizer_inn)}
                            {this.getRow('ОГРН', ticket.organizer_ogrn)}
                            {this.getRow('ОГРНИП', ticket.organizer_ogrnip)}
                            {this.getRow('Адрес', ticket.organizer_address)}
                        </Col>
                        <Col span={8}>
                            {this.getRow('Продавец', ticket.seller)}
                            {this.getRow('ИНН', ticket.seller_inn)}
                            {this.getRow('ОГРН', ticket.seller_ogrn)}
                            {this.getRow('ОГРНИП', ticket.seller_ogrnip)}
                            {this.getRow('Адрес', ticket.seller_address)}
                        </Col>
                        <Col span={8} style={{ textAlign: 'right' }}>
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