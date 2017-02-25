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
                            <p>Бланков: {stats.blank}</p>
                            <p>Продано: {stats.sold}</p>
                            <p>Забраковано: {stats.cancelled}</p>
                            <p>Всего: {stats.totalTickets}</p>
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
