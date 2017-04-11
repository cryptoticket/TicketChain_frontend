import React, {Component, PropTypes} from 'react';
import { Table, Spin, Input, DatePicker, Row, Col  } from 'antd';
import { Link, browserHistory } from 'react-router'
import ruRU from 'antd/lib/date-picker/locale/ru_RU';

const { Column, ColumnGroup } = Table;

const Search = Input.Search;

export const mappingState = (state) => {
    switch (state) {
        case 'created': return 'Бланк';
        case 'sold': return 'Продан';
        case 'cancelled': return 'Забракован';
        case 'error': return 'Ошибка загрузки';
        default: return;
    }
};

class TicketsTableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchIsDirty: false,
            pagination: {total: 50, current: parseInt(props.location.query.page), pageSize: 50}
        };
    }

    componentWillMount() {
        const state = this.props.location.query.state;
        if (!this.props.count) {
            this.props.getTicketsCount(this.props.inn, {state: state ? state : null});
        }
        this.props.getTickets(this.props.inn, {page: this.props.location.query.page, limit: 50, state: state ? state: null});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.count && this.props !== nextProps.count) {
            const pagination = this.state.pagination;
            pagination.total = nextProps.count;
            this.setState({pagination});
        }
        if (this.props.location.query.page !== nextProps.location.query.page) {
            this.props.getTickets(this.props.inn, {page: nextProps.location.query.page, limit: 50, state: this.props.location.query.state});
            const pagination = {total: nextProps.count, current: parseInt(nextProps.location.query.page), pageSize: 50};
            this.setState({pagination});
        }
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
        const params = {page: pagination.current, limit: pagination.pageSize,  state: this.props.location.query.state};
        browserHistory.push(`/organizers/${this.props.inn}/tickets?page=${pagination.current}&limit=50${this.props.location.query.state ? `$state=${this.props.location.query.state}`: null}`);
        this.props.getTickets(this.props.inn, params);
    };

    handleDate = (date) => {

    };

    render() {
        const {tickets, isFetching, inn} = this.props;
        const {pagination, searchIsDirty} = this.state;
        const data = tickets.map((ticket, key) =>
            ({
                key,
                number: key + 1+ (pagination.current ? 50 * (pagination.current - 1): 0),
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
                render: (text, record) => (record.state !== 'error' ?
                    <Link to={`/organizers/${inn}/tickets/${record.ticketId}`}>{text}</Link> :
                    null
                )
            }, {
                title: 'Номер/серия',
                dataIndex: 'serial_number',
                key: 'serial_number',
                render: (text, record) => (record.state === 'error' ?
                        <p>{text}</p> :
                        <Link to={`/organizers/${inn}/tickets/${record.ticketId}`}>
                            {text.slice(0, 2) + " " + text.slice(2)}
                        </Link>
                )
            }, {
                title: 'Дата создания',
                dataIndex: 'created_date',
                key: 'created_date',
                render: (text, record) => (record.state !== 'error' ?
                    <Link to={`/organizers/${inn}/tickets/${record.ticketId}`}>{moment(text).format('YYYY/MM/DD')}</Link> :
                        null
                )
            }, {
                title: 'Состояние',
                dataIndex: 'state',
                key: 'state',
                render: (text, record) => (record.state === 'error' ?
                    <p>{mappingState(record.state)}</p> :
                    <Link to={`/organizers/${inn}/tickets/${record.ticketId}`}>{mappingState(record.state)}</Link>
                )
            }
        ];
        moment.locale('ru');
        return (
            <Spin tip="Загрузка..." spinning={isFetching}>

                <div className="panel tickets">
                    <div className="panel-head">
                        <Row gutter={2}>
                            <Col xs={12} sm={12} md={12} lg={12} className="menu">
                                <h3>Билеты</h3>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6} className="menu">
                                <DatePicker
                                    locale={ruRU}
                                    format='YYYY/MM/DD'
                                    size="default"
                                    onChange={this.handleDate}
                                />
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6} className="menu">
                                <Search
                                    placeholder="серия/номер"
                                    onSearch={this.handleSearch}
                                />
                            </Col>
                        </Row>
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
    getTicketsCount: PropTypes.func.isRequired,
    getTicket: PropTypes.func.isRequired
};

export default TicketsTableComponent;
