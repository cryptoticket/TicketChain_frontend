import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router'
import { Spin} from 'antd';

class CsvJobsPanel extends Component {

    render() {
        const {csvJob, inn, isFetching} = this.props;
        return (
            <Spin tip="Загрузка..." spinning={isFetching}>
                {csvJob.status !== 'ready' ?
                    <div className="panel">
                        <div className="panel-head">
                            <h3>Файл обрабатывается...</h3>
                        </div>
                    </div>
                    :
                    <div className="panel">
                        <div className="panel-head">
                            <h3><Link to={`/organizers/${inn}/batches/${csvJob.batch_id}`}>Перейти на страницу списка.</Link></h3>
                        </div>
                        {csvJob.errors.length ?
                            <div>
                                <p>Список ошибок:</p>
                                {csvJob.errors.map(error => <p key={error}>{error}</p>)}
                            </div> : null
                        }
                        {csvJob.collisions.length ?
                            <div>
                                <p>Список пересечений:</p>
                                {csvJob.collisions.map(collision => <p key={collision}>{collision}</p>)}
                            </div> : null
                        }
                    </div>
                }
            </Spin>
        );
    }
}

CsvJobsPanel.PropTypes = {
    csvJob: PropTypes.object.isRequired,
    inn: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default CsvJobsPanel;
