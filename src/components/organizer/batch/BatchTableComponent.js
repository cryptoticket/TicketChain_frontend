import React, {Component, PropTypes} from 'react';
import { Table, Spin } from 'antd';
import { Link } from 'react-router'

const { Column, ColumnGroup } = Table;

class BatchTableComponent extends Component {

    render() {
        const {batch, inn, isFetching} = this.props;
        const data = batch.map((id, key) =>
            ({
                key,
                number: key + 1,
                id
            })
        );
        const columns = [
            {
                title: '№',
                dataIndex: 'number',
                key: 'number',
                render: (text) => <Link to={`/organizers/${inn}/tickets/${text}`}>{text}</Link>
            }, {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                render: (text) => <Link to={`/organizers/${inn}/tickets/${text}`}>{text}</Link>
            }
        ];
        return (
            <Spin tip="Загрузка..." spinning={isFetching}>

                <div className="panel">
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