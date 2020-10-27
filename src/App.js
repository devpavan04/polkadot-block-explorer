import React, { Component } from 'react'
import loader from '../src/img/loader.gif'
import { ApiPromise, WsProvider } from '@polkadot/api';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Explorer from './components/Explorer/Explorer';
import Nav from './components/Navbar/Nav';
import SearchBlock from './components/SearchBlock/SearchBlock';

export class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      api: null
    }
    this.connect()
  }

  connect = async () => {
    const provider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider });
    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version()
    ]);
    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
    this.setState({ api })
  }

  render() {
    return (
      <>
        <Router>
          <Nav />
          {
            this.state.api
              ?
              <Switch>
                <Route path='/polkadot-block-explorer' exact render={() =>
                  <Explorer api={this.state.api} />}
                />
                <Route path='/search' render={() =>
                  <SearchBlock api={this.state.api} />}
                />
              </Switch>
              :
              <img src={loader} style={{ display: 'block', margin: 'auto', width: '300px' }} />
          }
        </Router>
      </>

    )
  }
}

export default App

