import React, {Component, PropTypes} from 'react';

class OrganizerComponent extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

OrganizerComponent.PropTypes = {
    children: PropTypes.element.isRequired
};


export default OrganizerComponent;