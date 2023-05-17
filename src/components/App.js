import "../styles/App.css";
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if ('serviceWorker' in navigator) {
            console.log("hello");
            navigator.serviceWorker.register("../sw.js")
                .then(reg => console.log('service worker registered'))
                .catch(err => console.log('service worker not registered', err));
        }
    }

    render() {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
}

export default App;