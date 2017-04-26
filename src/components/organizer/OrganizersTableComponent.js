import React, {Component, PropTypes} from 'react';
import { Table, Spin } from 'antd';
import { Link } from 'react-router'

const { Column, ColumnGroup } = Table;

class OrganizersTableComponent extends Component {

    render() {
        const {organizers, isFetching} = this.props;
        const data = organizers.map((organizer, key) =>
            ({
                key,
                number: key + 1,
                organizer_inn: organizer
            })
        );
        const columns = [
            {
                title: '№',
                dataIndex: 'number',
                key: 'number',
                render: (text, record) => <Link to={`/organizers/${record.organizer_inn}/tickets?page=1&limit=50`}>{text}</Link>
            }, {
                title: 'ИНН',
                dataIndex: 'organizer_inn',
                key: 'organizer_inn',
                render: (text, record) => <Link to={`/organizers/${record.organizer_inn}/tickets?page=1&limit=50`}>{text}</Link>
            }, {
                title: ' ',
                dataIndex: 'Статистика',
                key: 'statistic',
                render: (text, record) => <Link to={`/organizers/${record.organizer_inn}/stats`}>Статистика</Link>
            }


        ];
        return (
            <Spin tip="Загрузка..." spinning={isFetching}>

                <div>
                    <div className="panel-head">
                        <h3>Организаторы</h3>
                    </div>
                    {data.length ? <Table dataSource={data} columns={columns} pagination={false} /> : null}
                </div>
            </Spin>
        );
    }
}

OrganizersTableComponent.PropTypes = {
    organizers: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default OrganizersTableComponent;