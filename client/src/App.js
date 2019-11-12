import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {
    channelStatusSelector,
    errorSelector,
    isLoadingSelector,
    serverStatusSelector,
    temperatureSelector
} from "./store/selectors";
import './App.scss';
import {channelStop, getRequest} from "./store/action-creators";

class App extends Component {

    componentDidMount() {
        // this.props.getRequestActionCreators()
    }

    render() {
        const { temperature } = this.props;
        return (
            <div className="temperature">
                <div className="field">
                    {temperature
                        ? <p>The temperature in Yerevan is: {temperature} °F</p>
                        : <p>Loading...</p>}
                <div className='action'>
                    <button onClick={this.props.getRequestActionCreators}>
                        Start Socket Channel
                    </button>
                    <button onClick={this.props.stopChannelActionCreator}>
                        Stop Socket Channel
                    </button>
                </div>
                <div className="status">
                    <h2>
                        Connection Info
                    </h2>
                    <h4>
                        Server status -
                        <span>
                            {this.props.serverStatus}
                        </span>
                    </h4>
                    <h4>
                        Channel status -
                        <span>
                            {this.props.channelStatus}
                        </span>
                    </h4>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    temperature: temperatureSelector(state),
    serverStatus: serverStatusSelector(state),
    channelStatus: channelStatusSelector(state),
    error: errorSelector(state),
    isLoading: isLoadingSelector(state)
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getRequestActionCreators: getRequest,
        stopChannelActionCreator: channelStop
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App)
