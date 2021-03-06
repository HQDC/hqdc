import React, {
    PropTypes, Component
}
from 'react';
import Header from './Header';
import Footer from './Footer';
import ModalContainer from './ModalContainer';
import AlertContainer from './AlertContainer';
import {
    connect
}
from 'react-redux';
import {
    pushState
}
from 'redux-router';
class App extends Component {

    render() {

        const {
            children
        } = this.props;
        return (
            <div>
                <Header />
                <AlertContainer />
                <ModalContainer />
                {children}
                <Footer />
            </div>
        );
    }
}

App.propTypes = {
    // Injected by React Router
    children: PropTypes.node
};

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {
        pushState
    })(App)
    /*
     <Header />
     {this.props.children}
     */