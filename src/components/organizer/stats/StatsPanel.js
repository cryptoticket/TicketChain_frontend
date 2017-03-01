import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router'
import { Spin} from 'antd';

class StatsPanel extends Component {

    render() {
        const {stats, inn, isFetching} = this.props;

        return (
            <Spin tip="Загрузка..." spinning={isFetching}>
                <div className="panel">
                    <div className="panel-head">
                        <h3>Статистика</h3>
                    </div>
                    {stats ?
                        <div>
                            <p>Бланков: <Link to={`/organizers/${inn}/tickets?page=1&limit=50&state=0`}>{stats.blank}</Link></p>
                            <p>Продано: <Link to={`/organizers/${inn}/tickets?page=1&limit=50&state=1`}>{stats.sold}</Link></p>
                            <p>Забраковано: <Link to={`/organizers/${inn}/tickets?page=1&limit=50&state=1`}>{stats.cancelled}</Link></p>
                            <p>Всего: <Link to={`/organizers/${inn}/tickets?page=1&limit=50`}>{stats.totalTickets}</Link></p>
                        </div> : null
                    }
                </div>
            </Spin>
        );
    }
}

StatsPanel.PropTypes = {
    stats: PropTypes.object.isRequired,
    inn: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default StatsPanel;
