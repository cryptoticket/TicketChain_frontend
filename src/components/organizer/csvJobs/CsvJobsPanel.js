import React, {Component, PropTypes} from 'react';

import { Spin} from 'antd';

class CsvJobsPanel extends Component {

    render() {
        const {csvJob, inn, isFetching} = this.props;
        return (
            <Spin tip="Загрузка..." spinning={isFetching}>
                {csvJob !== 'ready' ?
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
                                errors.map(error => <p>error</p>)
                            </div> : null
                        }
                        {csvJob.collisions.length ?
                            <div>
                                <p>Список пересечений:</p>
                                collisions.map(collision => <p>collision</p>)
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
