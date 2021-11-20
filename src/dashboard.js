import {Component} from 'react';
import './dashboard.css';

// Use account token as dashboard auth instead of username
// How about if we just send the account token to the lambda function along with the request instead for authentication instead of
// user-side auth LMAO
export default class Dashboard extends Component {
    handleChange = event => {
        let elementName = event.target.name
        let elementType = event.target.type
        if (elementType === "checkbox") {
            let elementStatus = event.target.checked
            console.log(elementStatus);
        }
        console.log(elementName);
    }

    renderDashboard = () => {
        if (window.location.search) {
            var a = window.location.search.substring(1).split("=");
            if (a[0] === "user") {
                this.username = a[1]
            }
        }
        if (this.username) {
            return <div>
                <div className="dashboard-container">
                    <div className="headerText">
                        Welcome to your ARToolkit2 dashboard, @{this.username}<br/>
                        What can we help you with today?
                    </div>
                </div>
                <br/>
                <div className="dashboard-container">
                    <div className="dashboard-form">
                        <label className="form-control">
                            <input type="checkbox" name="non-english" onChange={this.handleChange} />
                                Remove Non-English Standard Characters From Chat
                        </label>
                        <br/>
                        More features coming soon!!!
                    </div>
                </div>
            </div>
        } else {
            window.location.href="/";
        }
    }

    render() {
        return (
            <div>
                {this.renderDashboard()}
            </div> 
        )
    }
}