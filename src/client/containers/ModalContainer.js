/**
 * Created by Tile on 2015/12/1.
 */
import React, {PropTypes, Component}from 'react';
import {delModal}from '../actions/modal';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';
import CreateRoomTestModal from '../components/CreateRoomTestModal';
class ModalContainer extends Component {
    render() {
        let showModal = "";
        if (this.props.curtmodal != null && this.props.curtmodal != ""){
            showModal = React.createElement(this.props.curtmodal,null);
        }
        console.log("ModalContainer render", showModal);
        return (
            <div className="modalContainer">
                {showModal}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        curtmodal: state.modals.onShowModal
    }
}

ModalContainer.propTypes = {
    curtmodal:React.PropTypes.oneOfType([
        React.PropTypes.string,
        PropTypes.func
    ])
};

export default connect(mapStateToProps, {
    delModal
})(ModalContainer);