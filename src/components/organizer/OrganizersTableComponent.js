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
                organizer: organizer.organizer,
                organizer_inn: organizer.organizer_inn,
                organizer_ogrn: organizer.organizer_address,
                organizer_ogrnip: organizer.organizer_address,
                organizer_address: organizer.organizer_address
            })
        );
        const columns = [
            {
                title: '№',
                dataIndex: 'number',
                key: 'number',
                render: (text, record) => <Link to={`/organizers/${record.organizer_inn}/tickets?page=1&limit=10`}>{text}</Link>
            }, {
                title: 'Организатор',
                dataIndex: 'organizer',
                key: 'organizer',
                render: (text, record) => <Link to={`/organizers/${record.organizer_inn}/tickets?page=1&limit=10`}>{text}</Link>
            }, {
                title: 'ИНН',
                dataIndex: 'organizer_inn',
                key: 'organizer_inn',
                render: (text, record) => <Link to={`/organizers/${record.organizer_inn}/tickets?page=1&limit=10`}>{text}</Link>
            }, {
                title: 'ОГРН',
                dataIndex: 'organizer_ogrn',
                key: 'organizer_ogrn',
                render: (text, record) => <Link to={`/organizers/${record.organizer_inn}/tickets?page=1&limit=10`}>{text}</Link>
            }, {
                title: 'ОГРНИП',
                dataIndex: 'organizer_ogrnip',
                key: 'organizer_ogrnip',
                render: (text, record) => <Link to={`/organizers/${record.organizer_inn}/tickets?page=1&limit=10`}>{text}</Link>
            }, {
                title: 'Адрес',
                dataIndex: 'organizer_address',
                key: 'organizer_address',
                render: (text, record) => <Link to={`/organizers/${record.organizer_inn}/tickets?page=1&limit=10`}>{text}</Link>
            }, {
                title: ' ',
                dataIndex: 'Статистика',
                key: 'statistic',
                render: (text, record) => <Link to={`/organizers/${record.organizer_inn}/stats`}>Статистика</Link>
            }


        ];
        return (
            <Spin tip="Загрузка..." spinning={isFetching}>

                <div className="panel">
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