import React, {Component, PropTypes} from 'react';
import { Form, Row, Col, Table, Spin, Button, Input, Switch, DatePicker } from 'antd';
import ruRU from 'antd/lib/date-picker/locale/ru_RU';


const FormItem = Form.Item;
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
        <Row gutter={2} style={{ marginTop: 12 }}>
            <Col span={10} style={{ textAlign: 'right', paddingTop: 6 }}>
                <h4>{label}:&nbsp;</h4>
            </Col>
            <Col span={14} style={{paddingTop: 6 }}>
                <span>{this.props.ticket ? value: null}</span>
            </Col>
        </Row>;



    getRowInput = (label, value) => {
        return (
            <Row gutter={2} style={{ marginTop: 8 }}>
                <Col span={10} style={{ textAlign: 'right', paddingTop: 6 }}>
                    <h4>{label}:&nbsp;</h4>
                </Col>
                <Col span={12}>
                    <FormItem style={{ marginBottom: 0 }}>
                        {this.props.form.getFieldDecorator(value)(<Input size="default"/>)}
                    </FormItem>
                </Col>
            </Row>
        )
    };

    getRowSwitch = (label, value) => {
        return (
            <Row gutter={2} style={{ marginTop: 8 }}>
                <Col span={10} style={{ textAlign: 'right', paddingTop: 6 }}>
                    <h4>{label}:&nbsp;</h4>
                </Col>
                <Col span={14}>
                    <FormItem style={{ marginBottom: 0 }}>
                        {this.props.form.getFieldDecorator(value)(<Switch size="default" />)}
                    </FormItem>
                </Col>
            </Row>
        )
    };

    getRowDatePicker = (label, value) => {
        return (
            <Row gutter={2} style={{ marginTop: 8 }}>
                <Col span={10} style={{ textAlign: 'right', paddingTop: 6 }}>
                    <h4>{label}:&nbsp;</h4>
                </Col>
                <Col span={14}>
                    <FormItem style={{ marginBottom: 0 }}>
                        {this.props.form.getFieldDecorator(value)
                        ( <DatePicker locale={ruRU} format='YYYY/MM/DD' size="default"/>)}
                    </FormItem>
                </Col>
            </Row>
        )
    };

    render() {
        const {ticket, inn, isFetching} = this.props;

        return (
            <Spin tip="Загрузка..." spinning={isFetching}>
                <div className="panel">
                    <Form onSubmit={this.editTicket} style={{paddingTop: '20px'}}>
                        <Row gutter={2}>
                            <Col span={8}>
                                {this.getRow('Серийный номер', ticket.serial_number)}
                                {this.getRow('ID', ticket.id)}
                                {this.getRow('Статус', ticket.state)}
                                {this.getRow('Дата создания', ticket.created_date)}
                                {this.getRowInput('Цена', 'price_rub')}
                                {this.getRowSwitch('Бумажный билет', 'is_paper_ticket')}
                                {this.getRowInput('Покупатель', 'buyer_name')}
                                {this.getRowDatePicker('Дата покупки', 'buying_date')}
                            </Col>
                            <Col span={8}>
                                {this.getRowInput('Мероприятие', 'event_title')}
                                {this.getRowInput('Место проведения', 'event_place_title')}
                                {this.getRowDatePicker('Дата', 'event_date')}
                                {this.getRowInput('Адрес', 'event_place_address')}
                                {this.getRowInput('Ряд', 'row')}
                                {this.getRowInput('Место', 'seat')}
                                {this.getRowInput('Категория билета', 'ticket_category')}
                            </Col>
                            <Col span={8}>
                                {this.getRowInput('Эмиттер', 'issuer')}
                                {this.getRowInput('ИНН', 'issuer_inn')}
                                {this.getRowInput('ОГРН', 'issuer_ogrn')}
                                {this.getRowInput('ОГРНИП', 'issuer_ogrnip')}
                                {this.getRowInput('Адрес', 'issuer_address')}
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
                                {this.getRowInput('Продавец', 'seller')}
                                {this.getRowInput('ИНН', 'seller_inn')}
                                {this.getRowInput('ОГРН', 'seller_ogrn')}
                                {this.getRowInput('ОГРНИП', 'seller_ogrnip')}
                                {this.getRowInput('Адрес', 'seller_address')}
                            </Col>
                            <Col span={8} style={{ textAlign: 'right' }}>
                                <div style={{marginTop: '168px'}}>
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
                    </Form>
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
    handleTicket: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,

};

export default Form.create({
    onFieldsChange(props, changedFields) {
        let ticket = props.ticket;
        ticket[Object.keys(changedFields)[0]] = changedFields[Object.keys(changedFields)[0]].value;
        props.handleTicket(ticket);
    },
    mapPropsToFields(props) {
        return {
            serial_number: {
                ...props.serial_number,
                value: props.ticket.serial_number
            },
            price_rub: {
                ...props.price_rub,
                value: props.ticket.price_rub
            },
            is_paper_ticket: {
                ...props.is_paper_ticket,
                value: props.ticket.is_paper_ticket
            },
            buyer_name: {
                ...props.buyer_name,
                value: props.ticket.buyer_name
            },
            buying_date: {
                ...props.buying_date,
                value: moment(props.ticket.buying_date)
            },
            issuer: {
                ...props.issuer,
                value: props.ticket.issuer
            },
            issuer_inn: {
                ...props.issuer_inn,
                value: props.ticket.issuer_inn
            },
            issuer_ogrn: {
                ...props.issuer_ogrn,
                value: props.ticket.issuer_ogrn
            },
            issuer_ogrnip: {
                ...props.issuer_ogrnip,
                value: props.ticket.issuer_ogrnip
            },
            issuer_address: {
                ...props.issuer_address,
                value: props.ticket.issuer_address
            },
            event_title: {
                ...props.event_title,
                value: props.ticket.event_title
            },
            event_place_title: {
                ...props.event_place_title,
                value: props.ticket.event_place_title
            },
            event_date: {
                ...props.event_date,
                value: moment(props.ticket.event_date)
            },
            event_place_address: {
                ...props.event_place_address,
                value: props.ticket.event_place_address
            },
            row: {
                ...props.row,
                value: props.ticket.row
            },
            seat: {
                ...props.seat,
                value: props.ticket.seat
            },
            ticket_category: {
                ...props.ticket_category,
                value: props.ticket.ticket_category
            },
            organizer: {
                ...props.organizer,
                value: props.ticket.organizer
            },
            organizer_inn: {
                ...props.organizer_inn,
                value: props.ticket.organizer_inn
            },
            organizer_ogrn: {
                ...props.organizer_ogrn,
                value: props.ticket.organizer_ogrn
            },
            organizer_ogrnip: {
                ...props.organizer_ogrnip,
                value: props.ticket.organizer_ogrnip
            },
            organizer_address: {
                ...props.organizer_address,
                value: props.ticket.organizer_address
            },
            seller: {
                ...props.seller,
                value: props.ticket.seller
            },
            seller_inn: {
                ...props.seller_inn,
                value: props.ticket.seller_inn
            },
            seller_ogrn: {
                ...props.seller_ogrn,
                value: props.ticket.seller_ogrn
            },
            seller_ogrnip: {
                ...props.seller_ogrnip,
                value: props.ticket.seller_ogrnip
            },
            seller_address: {
                ...props.seller_address,
                value: props.ticket.seller_address
            }
        };
    }
})(TicketPanelComponent);
