import React, {Component, PropTypes} from 'react';
import { Table, Spin, Input } from 'antd';
import { Link } from 'react-router'

const { Column, ColumnGroup } = Table;

const Search = Input.Search;

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
                title: 'Номер/серию',
                dataIndex: 'serial_number',
                key: 'serial_number',
                render: (text, record) => <Link to={`/organizers/${inn}/tickets/${record.ticketId}`}>
                    {text.slice(0, 2) + " " + text.slice(2)}
                </Link>
            }, {
                title: 'Дата создания',
                dataIndex: 'created_date',
                key: 'created_date',
                render: (text, record) => <Link to={`/organizers/${inn}/tickets/${record.ticketId}`}>{moment(text).format('YYYY/MM/DD')}</Link>
            }
        ];

        return (
            <Spin tip="Загрузка..." spinning={isFetching}>

                <div className="panel tickets">
                    <div className="panel-head">
                        <h3>Билеты</h3>
                        <div className="search">
                            <Search
                                placeholder="серия/номер"
                                style={{ width: 200 }}
                                onSearch={value => console.log(value)}
                            />
                        </div>
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