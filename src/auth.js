import {Component} from 'react';
import './index.css';

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

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

    sendUser = (curUser) => {
        postData("https://m2nl5gp1l7.execute-api.eu-west-1.amazonaws.com/beta", {user: curUser}).then(response => {
            console.log(response);
        });
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
                this.sendUser(user);
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