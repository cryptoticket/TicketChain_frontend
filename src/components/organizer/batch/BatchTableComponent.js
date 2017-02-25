import React, {Component, PropTypes} from 'react';
import { Table, Spin } from 'antd';
import { Link } from 'react-router'

const { Column, ColumnGroup } = Table;

class BatchTableComponent extends Component {

    render() {
        const {batch, inn, isFetching} = this.props;
        const data = batch.map((ticket, key) =>
            ({
                key,
                number: key + 1,
                serial_number: ticket.serial_number
            })
        );
        const columns = [
            {
                title: '№',
                dataIndex: 'number',
                key: 'number',
                render: (text) => <Link to={`/organizers/${inn}/tickets/${text}`}>{text}</Link>
            }, {
                title: 'Номер/серия',
                dataIndex: 'serial_number',
                key: 'serial_number',
                render: (text) => <Link to={`/organizers/${inn}/tickets/${text}`}>
                        {text.slice(0, 2) + " " + text.slice(2)}
                    </Link>
            }
        ];
        return (
            <Spin tip="Загрузка..." spinning={isFetching}>

                <div className="panel">
                    <div className="panel-head">
                        <h3>Организатор: {inn}</h3>
                    </div>
                    {data.length ? <Table dataSource={data} columns={columns} pagination={false} /> : null}
                </div>
            </Spin>
        );
    }
}

BatchTableComponent.PropTypes = {
    batch: PropTypes.array.isRequired,
    inn: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default BatchTableComponent;
