import React, { Component } from 'react'
import './SearchBlock.css'
import loader from '../../img/loader.gif'
import Block from '../Block/Block'

export class SearchBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      api: props.api,
      blockNumber: '',
      blockHash: null,
      block: {}
    }
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getBlockDetails = async () => {
    await this.state.api.rpc.chain.getBlockHash(this.state.blockNumber, async (hash) => {
      this.setState({ blockHash: hash.toString() })
      await this.state.api.rpc.chain.getBlock(this.state.blockHash, async (signedBlock) => {
        let data
        data = JSON.parse(signedBlock.block.toString()).header
        const header = await this.state.api.derive.chain.getHeader(this.state.blockHash)
        let blockTimeStamp
        signedBlock.block.extrinsics.forEach((ex, index) => {
          if (ex.toHuman().method.section === 'timestamp') {
            let epoch = Number(ex.toHuman().method.args[0].replace(/,/g, ''))
            let timestamp = new Date(epoch);
            blockTimeStamp = timestamp.toString()
          }
        });
        const retreivedBlock = {
          parentHash: data.parentHash,
          stateRoot: data.stateRoot,
          extrinsicsRoot: data.extrinsicsRoot,
          blockNumber: this.state.blockNumber,
          hash: this.state.blockHash,
          timestamp: blockTimeStamp,
          blockAuthor: header.author.toString(),
        }
        this.setState({ block: retreivedBlock })
      });
    });
  }

  handleSubmit = (e) => {
    this.getBlockDetails()
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <div className='form-styles'>
          <form onSubmit={this.handleSubmit}>
            <label>Enter Block Number</label>
            <input type='text' name='blockNumber' value={this.state.blockNumber} onChange={this.onChangeHandler} />
            <input type="submit" value="Get Block" />
          </form>
        </div>
        {
          Object.keys(this.state.block).length === 0 && this.state.blockHash !== null
            ?
            <img src={loader} style={{ display: 'block', margin: 'auto', width: '300px' }} />
            :
            Object.keys(this.state.block).length !== 0
              ?
              <div key={this.state.blockHash}>
                <Block block={this.state.block} />
              </div>
              :
              null
        }
      </div>
    )
  }
}

export default SearchBlock
