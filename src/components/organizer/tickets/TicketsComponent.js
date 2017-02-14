import React, {Component, PropTypes} from 'react';

class TicketsComponent extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

TicketsComponent.PropTypes = {
    children: PropTypes.element.isRequired
};


export default TicketsComponent;