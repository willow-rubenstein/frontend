import {Component} from 'react';
import './index.css';

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {modOn: false};
        // Get Authentication Token from URL Hash Fragments (if exists)
        if (window.location.hash) {
            var params = (window.location.hash.substr(1)).split("&");
            var a = params[0].split("=");
            this.ircAuth = 'oauth:'+a[1];
            console.log(this.ircAuth);
            this.bearerAuth = 'Bearer '+a[1];
            this.authProcess();
        }
    }

    modBot = (user) => {
        const tmi = require('tmi.js');
        const client = new tmi.Client({
            options: { 
                debug: false,
                skipUpdatingEmotesets: true, 
                updateEmotesetsTimer: 0,
            },
            identity: {
                username: 'artoolkit',
                password: this.ircAuth
            },
            channels: [user]
        });
        client.connect()
        client.on("join", () => {
            client.mod(user, "artoolkit")
            .then(() => {
                console.log("successfully modded bot in user's channel");
                client.disconnect();
                window.location.href = `/dashboard?user=${user}`;
            }).catch((err) => {
                if (err === "bad_mod_mod") {
                    console.log("bot is already modded. returning back to home.")
                    client.disconnect();
                    window.location.href = `/dashboard?user=${user}`;
                } else {
                    console.log(`Failed to mod bot. Full traceback: ${err}`);
                }
                
            });
            client.mod(user, "artoolkit")
        });
    }

    authProcess = () => {
        fetch('https://api.twitch.tv/helix/users', {headers:{'Authorization': this.bearerAuth, 'Client-Id': '9nwnf5k3xyemgbb7gciwks04qi6co8'}})
        .then(response => response.json())
        .then(out => this.modBot(out['data'][0]['login']));
    }

    render() {
        return (
            <div>
                Please wait while the bot is modded in your channel...
            </div>
        )
    }
}