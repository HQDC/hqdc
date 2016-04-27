/**
 * Created by Tile on 2015/12/1.
 */
import React, { PropTypes, Component } from 'react';
import {delModal} from '../actions/modal';
import { connect } from 'react-redux';
class ModalContainer extends Component {
    render() {
        let modals = this.props.modals.toArray();
        console.log("ModalContainer render",modals);
        let curtModal = "";
        if(modals.size > 0){
            curtModal =
            <Alert key={i+1} >
                hello123321
            </Alert>
        }
        return (
            <div className="modalContainer">
                <curtModal />
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