import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

class BaseComponent extends Component {

    render() {
        return (
            <div className="page-wrapper">
                <div className="content-wrapper">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

BaseComponent.PropTypes = {
    children: PropTypes.element.isRequired
};

// const mapStateToProps = (state) => ({showUploadPanel: state.showUploadPanel});
// const mapDispatchToProps = (dispatch) => (bindActionCreators(new AuthActions,dispatch));

export default BaseComponent;