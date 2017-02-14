import React, {Component, PropTypes} from 'react';
import { Table, Spin } from 'antd';
import { Link } from 'react-router'

const { Column, ColumnGroup } = Table;

class TicketsTableComponent extends Component {

    render() {
        const {tickets, isFetching, inn} = this.props;
        const data = tickets.map((ticket, key) =>
            ({
                key,
                number: key + 1,
                ticketId: ticket.id,
                serial_number: ticket.serial_number,
                created_date: ticket.created_date
            })
        );
        const columns = [
            {
                title: '№',
                dataIndex: 'number',
                key: 'number',
                render: (text, record) => <Link to={`/organizers/${inn}/tickets/${record.ticketId}`}>{text}</Link>
            }, {
                title: 'Серийный Номер',
                dataIndex: 'serial_number',
                key: 'serial_number',
                render: (text, record) => <Link to={`/organizers/${inn}/tickets/${record.ticketId}`}>{text}</Link>
            }, {
                title: 'Дата создания',
                dataIndex: 'created_date',
                key: 'created_date',
                render: (text, record) => <Link to={`/organizers/${inn}/tickets/${record.ticketId}`}>{moment(text).format('YYYY/MM/DD')}</Link>
            }
        ];

        return (
            <Spin tip="Загрузка..." spinning={isFetching}>

                <div className="panel">
                    <div className="panel-head">
                        <h3>Билеты</h3>
                    </div>
                    {data.length ? <Table dataSource={data} columns={columns} pagination={false} /> : null}
                </div>
            </Spin>
        );
    }
}

TicketsTableComponent.PropTypes = {
    tickets: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    inn: PropTypes.number.isRequired
};

export default TicketsTableComponent;