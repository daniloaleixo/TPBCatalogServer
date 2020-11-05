import React from 'react';
import SearchAppBar from './searchBar'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    movieChange(result) {
        this.setState({ list: result })
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <SearchAppBar onMovieChange={this.movieChange.bind(this)} ></SearchAppBar>
            </div>
        );
    }
}
export default App;