import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {
    errorSelector,
    isLoadingSelector,
    temperatureSelector
} from "./store/selectors";
import './App.scss';
import {getRequest} from "./store/action-creators";

class App extends Component {

    componentDidMount() {
        this.props.getRequesActionCreators()
    }

    render() {
        const { temperature } = this.props;
        return (
            <div className="temperature">
                <div className="field">
                    {temperature
                        ? <p>The temperature in Yerevan is: {temperature} °F</p>
                        : <p>Loading...</p>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    temperature: temperatureSelector(state),
    error: errorSelector(state),
    isLoading: isLoadingSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getRequesActionCreators: getRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App)
