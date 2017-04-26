import React, {Component, PropTypes} from 'react';
import { Form, Row, Col, Table, Spin, Button, Input, Switch, DatePicker } from 'antd';
import ruRU from 'antd/lib/date-picker/locale/ru_RU';

import NumberInput from '../../blank/NumberInput';
import {mappingState} from '../tickets/TicketsTableComponent';
const FormItem = Form.Item;
const { Column, ColumnGroup } = Table;

class TicketPanelComponent extends Component {

    sellTicket = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const ticket = Object.assign({}, this.props.ticket);
                Object.keys(ticket).forEach((key,index) => {
                    if (typeof ticket[key] === 'object' && ticket[key] && !moment.isMoment(ticket[key])) {
                        this.props.ticket[key] = ticket[key][key];
                        ticket[key] = ticket[key][key];
                    } else if (moment.isMoment(ticket[key])) {
                        ticket[key] = moment(ticket[key]).toDate();
                    }
                });
                this.props.sellTicket(this.props.inn, ticket)
            }
        });

    };

    cancelTicket = () => {
        this.props.cancelTicket(this.props.inn,this.props.ticket)
    };

    editTicket = (e) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const ticket = Object.assign({}, this.props.ticket);
                Object.keys(ticket).forEach((key,index) => {
                    if (typeof ticket[key] === 'object' && ticket[key] && !moment.isMoment(ticket[key])) {
                        this.props.ticket[key] = ticket[key][key];
                        ticket[key] = ticket[key][key];
                    } else if (moment.isMoment(ticket[key])) {
                        ticket[key] = moment(ticket[key]).toDate();
                    }
                });
                this.props.editTicket(this.props.inn, ticket)
            }
        });
    };

    getRow = (label, value) =>
        <Row gutter={2} style={{ marginTop: 4, paddingBottom: 10}}>
            <Col span={10} style={{ textAlign: 'right', paddingTop: 6 }}>
                <h4>{label}:&nbsp;</h4>
            </Col>
            <Col span={14} style={{paddingTop: 6 }}>
                <span>{this.props.ticket ? value: null}</span>
            </Col>
        </Row>;



    getRowInput = (label, value, hasFeedback, required, message, validator, customComponent) => {
        return (
            <Row gutter={2}>
                <Col span={10} style={{ textAlign: 'right', paddingTop: 6 }}>
                    <h4>{label}:&nbsp;</h4>
                </Col>
                <Col span={12}>
                    <FormItem style={{ marginBottom: 0 }} hasFeedback={hasFeedback}>
                        {this.props.form.getFieldDecorator(
                            value,
                            {rules: [{required, message}, {validator}],
                            })(customComponent? customComponent : <Input size="default"/>)
                        }
                    </FormItem>
                </Col>
            </Row>
        )
    };

    getDoubleRowInput = (value) => {
        return (
            <Row gutter={2}>
                <Col span={10} style={{ textAlign: 'right', paddingTop: 6 }}>
                    <h4>Компания&nbsp;&nbsp; <br/> выпуст-шая билет:&nbsp;</h4>
                </Col>
                <Col span={12} style={{ paddingTop: 12 }}>
                    <FormItem style={{ marginBottom: 0 }}>
                        {this.props.form.getFieldDecorator(value)(<Input size="default"/>)}
                    </FormItem>
                </Col>
            </Row>
        )
    };

    getRowSwitch = (label, value) => {
        return (
            <Row gutter={2}>
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

    getRowDatePicker = (label, value, disabled) => {
        moment.locale('ru');
        return (
            <Row gutter={2}>
                <Col span={10} style={{ textAlign: 'right', paddingTop: 6 }}>
                    <h4>{label}:&nbsp;</h4>
                </Col>
                <Col span={14}>
                    <FormItem style={{ marginBottom: 0 }}>
                        {this.props.form.getFieldDecorator(value)
                        ( <DatePicker locale={ruRU} format='YYYY/MM/DD' size="default" disabled={disabled}/> )}
                    </FormItem>
                </Col>
            </Row>
        )
    };

    checkInn = (rule, value, callback) => {
        let inn;
        if (value && value[Object.keys(value)[0]]) {
            inn = value[Object.keys(value)[0]];
        } else {
            callback();
            return;
        }
        if (inn.length === 12 || inn.length === 10) {
            callback();
            return;
        } else {
            callback('Введите корректный ИНН!');
        }
    };

    checkOgrn = (rule, value, callback) => {
        let ogrn;
        if (value && value[Object.keys(value)[0]]) {
            ogrn = value[Object.keys(value)[0]];
        } else {
            callback();
            return;
        }
        if (ogrn.length === 13) {
            callback();
            return;
        } else {
            callback('Введите корректный ОГРН!');
        }
    };

    checkOgrnip = (rule, value, callback) => {
        let ogrnip;
        if (value && value[Object.keys(value)[0]]) {
            ogrnip = value[Object.keys(value)[0]];
        } else {
            callback();
            return;
        }
        if (ogrnip.length === 15) {
            callback();
            return;
        } else {
            callback('Введите корректный ОГРНИП!');
        }
    };

    render() {
        const { getFieldDecorator} = this.props.form;
        const {ticket, inn, isFetching} = this.props;
        return (
            <Spin tip="Загрузка..." spinning={isFetching}>
                <Form style={{padding: '20px 120px 0 120px'}}>
                    <Row gutter={2}>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            {this.getRow('Номер/серия', ticket.serial_number)}
                            {this.getRow('ID', ticket.id)}
                            {this.getRow('Статус', mappingState(ticket.state))}
                            {this.getRow('Дата создания', ticket.created_date)}
                            {this.getRowInput('Цена', 'price_rub')}
                            {this.getRowSwitch('Бумажный билет', 'is_paper_ticket')}
                            {this.getRowInput('Покупатель', 'buyer_name')}
                            {this.getRowDatePicker('Дата покупки', 'buying_date')}
                            {this.getRowDatePicker('Дата отмены', 'cancelled_date', ticket.state !== 'cancelled')}
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            {this.getRowInput('Мероприятие', 'event_title')}
                            {this.getRowInput('Место проведения', 'event_place_title')}
                            {this.getRowDatePicker('Дата', 'event_date')}
                            {this.getRowInput('Адрес', 'event_place_address')}
                            {this.getRowInput('Ряд', 'row')}
                            {this.getRowInput('Место', 'seat')}
                            {this.getRowInput('Категория билета', 'ticket_category', null, null, null, (rule, value, callback) => callback(), <NumberInput field="ticket_category" maxLength="5"/>)}
                            {ticket.contract_address ? this.getRow('Смарт контаркт',
                                <a href={`https://kovan.etherscan.io/address/${ticket.contract_address}`} target="_blank">{ticket.contract_address}</a>
                                ): null
                            }
                        </Col>
                    </Row>
                    <Row gutter={2} style={{ marginTop: 32 }}>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            {this.getDoubleRowInput('issuer')}
                            {this.getRowInput('ИНН', 'issuer_inn', null, null, null, this.checkInn, <NumberInput field="issuer_inn" maxLength="12"/>)}
                            {this.getRowInput('ОГРН', 'issuer_ogrn', null, null, null, this.checkOgrn, <NumberInput field="issuer_ogrn" maxLength="13"/>)}
                            {this.getRowInput('ОГРНИП', 'issuer_ogrnip', null, null, null, this.checkOgrnip, <NumberInput field="issuer_ogrnip" maxLength="15"/>)}
                            {this.getRowInput('Адрес', 'issuer_address')}
                        </Col>
                    
                        <Col xs={24} sm={12} md={12} lg={12}>
                            {this.getRowInput('Организатор', 'organizer')}
                            {this.getRowInput('ИНН', 'organizer_inn', null, null, null, this.checkInn, <NumberInput field="organizer_inn" maxLength="12"/>)}
                            {this.getRowInput('ОГРН', 'organizer_ogrn', null, null, null, this.checkOgrn, <NumberInput field="organizer_ogrn" maxLength="13"/>)}
                            {this.getRowInput('ОГРНИП', 'organizer_ogrnip', null, null, null, this.checkOgrnip, <NumberInput field="organizer_ogrnip" maxLength="15"/>)}
                            {this.getRowInput('Адрес', 'organizer_address')}
                        </Col>
                    </Row>
                    <Row gutter={2} style={{ marginTop: 32 }}>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            {this.getRowInput('Продавец', 'seller')}
                            {this.getRowInput('ИНН', 'seller_inn', null, null, null, this.checkInn, <NumberInput field="seller_inn" maxLength="12"/>)}
                            {this.getRowInput('ОГРН', 'seller_ogrn', null, null, null, this.checkOgrn, <NumberInput field="seller_ogrn" maxLength="13"/>)}
                            {this.getRowInput('ОГРНИП', 'seller_ogrnip', null, null, null, this.checkOgrnip, <NumberInput field="seller_ogrnip" maxLength="15"/>)}
                            {this.getRowInput('Адрес', 'seller_address')}
                        </Col>
                    </Row>
                    <Row gutter={2} style={{ marginTop: 32 }}>
                        <Col span={16} offset={6}>
                            {ticket.state === 'created' ?
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
                        </Col>
                    </Row>
                </Form>
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
        if (Object.keys(changedFields).length) {
            ticket[Object.keys(changedFields)[0]] = changedFields[Object.keys(changedFields)[0]].value;
            props.handleTicket(ticket);
        }
    },
    mapPropsToFields(props) {
        return {
            serial_number: {
                ...props.serial_number,
                value: props.ticket.serial_number ? props.ticket.serial_number.toString() : null
            },
            price_rub: {
                ...props.price_rub,
                value: props.ticket.price_rub ? props.ticket.price_rub.toString() : null
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
                value: props.ticket.buying_date && props.ticket.buying_date !== "0" ? moment(props.ticket.buying_date) : null
            },
            cancelled_date: {
                ...props.cancelled_date,
                value: props.ticket.cancelled_date && props.ticket.cancelled_date !== "0" ? moment(props.ticket.cancelled_date) : null
            },
            contract_address: {
                ...props.contract_address,
                value: props.ticket.contract_address
            },
            issuer: {
                ...props.issuer,
                value: props.ticket.issuer
            },
            issuer_inn: {
                ...props.issuer_inn,
                value: {issuer_inn: props.ticket.issuer_inn}
            },
            issuer_ogrn: {
                ...props.issuer_ogrn,
                value: {issuer_ogrn: props.ticket.issuer_ogrn}
            },
            issuer_ogrnip: {
                ...props.issuer_ogrnip,
                value: {issuer_ogrnip: props.ticket.issuer_ogrnip}
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
                value: props.ticket.event_date && props.ticket.event_date !== "0" ? moment(props.ticket.event_date) : null
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
                value: {ticket_category: props.ticket.ticket_category}
            },
            organizer: {
                ...props.organizer,
                value: props.ticket.organizer
            },
            organizer_inn: {
                ...props.organizer_inn,
                value: {organizer_inn: props.ticket.organizer_inn}
            },
            organizer_ogrn: {
                ...props.organizer_ogrn,
                value: {organizer_ogrn: props.ticket.organizer_ogrn}
            },
            organizer_ogrnip: {
                ...props.organizer_ogrnip,
                value: {organizer_ogrnip: props.ticket.organizer_ogrnip}
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
                value: {seller_inn: props.ticket.seller_inn}
            },
            seller_ogrn: {
                ...props.seller_ogrn,
                value: {seller_ogrn: props.ticket.seller_ogrn}
            },
            seller_ogrnip: {
                ...props.seller_ogrnip,
                value: {seller_ogrnip: props.ticket.seller_ogrnip}
            },
            seller_address: {
                ...props.seller_address,
                value: props.ticket.seller_address
            }
        };
    }
})(TicketPanelComponent);
