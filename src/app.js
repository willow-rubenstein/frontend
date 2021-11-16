import {Component, React} from 'react';
import logo from './logo.png';
import './index.css';

export default class App extends Component {
    ircRedirect = () => {
        window.location.href = "https://id.twitch.tv/oauth2/authorize?client_id=9nwnf5k3xyemgbb7gciwks04qi6co8&redirect_uri=http://localhost:3000/auth&response_type=token&scope=chat:edit chat:read channel:moderate";
    }

    render() {
        return (
            <div className="container">
                <div id="child">
                    <div id="child-container">
                        <img src={logo} height="300px" alt="" /><br/>
                        Welcome to ARToolkit2.<br/>
                        <button onClick={this.ircRedirect}>Connect Bot Via Twitch</button>
                    </div> 
                </div>
            </div>
        )
    }
}