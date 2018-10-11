import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state ={term: null}
    }

    search() {

        if (this.state.term === null || this.state.term === "" ){
            alert('you have not entered anything');
        }else {
            this.props.searchClicked(`url(${this.props.image})`);

            this.props.onSearch(this.state.term);
        }


    }
    handleKeyPress(e){
        if (e.key === 'Enter') {
            console.log('do validate');
            this.props.searchClicked(`url(${this.props.image})`);
            this.props.onSearch(this.state.term);
        }
    }


    handleTermChange(e) {
        this.setState({term: e.target.value});
    }

    render() {
        return (
            <div className="SearchBar">
                <input onKeyPress={this.handleKeyPress} id={'input'} onChange={this.handleTermChange} placeholder={"Enter A Song, Album, or Artist"}/>
                <a  onClick={this.search}>SEARCH</a>
            </div>
        )
    }

}

export default SearchBar;
