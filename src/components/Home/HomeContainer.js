import React, { Component } from 'react';

class HomeContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { userInfo: {} };
  }

  componentDidMount() {
    fetch('/api/spotify/me')
      .then(res => res.json())
      .then(userInfo => {
        this.state.userInfo = userInfo;
        console.log('userInfo', userInfo);
      });
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value }); // eslint-disable-line react/no-unused-state
  }

  handleSubmit(event) {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('SUBMITING', this.state);
  }

  render() {
    // const { userInfo } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6 offset-md-3" />
          <div>Spotify Analytics</div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
