/**
 * Created by Tile on 2015/12/1.
 */
import React, {
    PropTypes,
    Component
} from 'react';
import {
    Alert
} from 'react-bootstrap';
import {
    delAlert
} from '../actions/alert';
import {
    connect
} from 'react-redux';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
class AlertContainer extends Component {
    constructor(props) {
        super(props);
        this.closeHandler = this.closeHandler.bind(this);
    }

    closeHandler(item) {
        this.props.delAlert(item);
    }

    render() {
        let alert_views = [];
        let {
            alertList
        } = this.props;
        console.log("render alert", alertList.size);
        if (alertList) {
            console.log("in render");
            for (var i = 0; i < alertList.size; i++) {
                let item = alertList.get(i);
                var itemView =
                    (
                        <Alert key={i+1} bsStyle={item.style} onDismiss={()=>this.closeHandler(item)}>
                            {item.msg}
                        </Alert>
                    );
                alert_views.push(itemView);
            }
        }
        return (
            <div className="alertContainer">
                {alert_views}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        alertList: state.alerts.onShowAlerts,
        delAlert: delAlert
    }
}

AlertContainer.propTypes = {
    alertList: ImmutablePropTypes.list.isRequired,
    delAlert: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
    delAlert
})(AlertContainer);