/**
 * Created by Tile on 2015/12/1.
 */
import React, { PropTypes, Component } from 'react';
import {delModal} from '../actions/modal';
import { connect } from 'react-redux';
class ModalContainer extends Component {
    render() {
        return (
            <div className="modalContainer">
                {this.props.modals}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        modals: state.modals.onShowModals
    }
}

ModalContainer.propTypes = {
    modals: PropTypes.array.isRequired
};

export default connect(mapStateToProps, {
    delModal
})(ModalContainer);