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
import Spinner from "./Spinner/Spinner";

class App extends Component {

    render() {
        const { temperature, isLoading } = this.props;
        return (
            <div className="temperature">
                <div className="field">
                    <div className='action'>
                        <button onClick={this.props.getRequestActionCreators}>
                            Start Socket Channel
                        </button>
                        <button onClick={this.props.stopChannelActionCreator}>
                            Stop Socket Channel
                        </button>
                    </div>
                        <hr/>
                    <div className="status">
                        <h4>
                            Connection Info
                        </h4>
                        <h5>
                            Server status - {this.props.serverStatus}
                        </h5>
                        <h5>
                            Channel status - {this.props.channelStatus}
                        </h5>
                    </div>
                    {<p>The temperature in Yerevan is: {temperature} °F</p>}
                    {isLoading && <Spinner />}
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
