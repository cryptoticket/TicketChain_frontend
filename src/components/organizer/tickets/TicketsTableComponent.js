import React, {Component, PropTypes} from 'react';
import { Table, Spin, Input } from 'antd';
import { Link } from 'react-router'

const { Column, ColumnGroup } = Table;

const Search = Input.Search;

export const mappingState = (state) => {
    switch (state) {
        case 'created': return 'Бланк';
        case 'sold': return 'Продан';
        case 'cancelled': return 'Забракован';
        default: return;
    }
};

class TicketsTableComponent extends Component {
    state = {
        searchIsDirty: false,
        pagination: {total: 20, current: 1}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.count && this.props !== nextProps.count) {
            const pagination = this.state.pagination;
            pagination.total = nextProps.count;
            this.setState({pagination});
        };
    }

    handleSearch = (value) => {
        const searchIsDirty = this.state.searchIsDirty;
        if (!searchIsDirty) {
            this.props.getTicket(this.props.inn, value, true);
            this.setState({searchIsDirty: true});
        } else {
            this.props.getTickets(this.props.inn);
            this.setState({searchIsDirty: false});
        }
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        const params = {page: pagination.current, limit: pagination.pageSize};
        this.props.getTickets(this.props.inn, params);
    };

    render() {
        const {tickets, isFetching, inn} = this.props;
        const {pagination, searchIsDirty} = this.state;
        const data = tickets.map((ticket, key) =>
            ({
                key,
                number: key + 1+ 10 * (pagination.current - 1),
                ticketId: ticket.id,
                serial_number: ticket.serial_number,
                created_date: ticket.created_date,
                state: ticket.state
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
            }, {
                title: 'Состояние',
                dataIndex: 'state',
                key: 'state',
                render: (text, record) => <Link to={`/organizers/${inn}/tickets/${record.ticketId}`}>{mappingState(record.state)}</Link>
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
                                onSearch={this.handleSearch}
                            />
                        </div>
                    </div>
                    {data.length ?
                        <Table
                            dataSource={data}
                            columns={columns}
                            pagination={searchIsDirty ? false : pagination}
                            onChange={this.handleTableChange}
                        /> : null
                    }
                </div>
            </Spin>
        );
    }
}

TicketsTableComponent.PropTypes = {
    tickets: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    inn: PropTypes.number.isRequired,
    getTickets: PropTypes.func.isRequired,
    getTicket: PropTypes.func.isRequired
};

export default TicketsTableComponent;