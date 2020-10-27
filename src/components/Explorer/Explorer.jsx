import React, { Component } from 'react'
import './Explorer.css'
import loader from '../../img/loader.gif'
import Block from '../Block/Block'

export class Explorer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      api: props.api,
      blocks: []
    }
    this.listenToNewBlocks()
  }

  listenToNewBlocks = async () => {
    let count = 0;
    let newBlocks = []
    await this.state.api.rpc.chain.subscribeNewHeads(async (header) => {
      let author
      await this.state.api.derive.chain.subscribeNewHeads((header) => {
        author = header.author.toString()
      })
      const timeStamp = await this.state.api.query.timestamp.now()
      const dateTime = new Date(timeStamp.toNumber())
      const dateTimeString = dateTime.toString()
      const blockHeader = {
        parentHash: header.parentHash.toString(),
        stateRoot: header.stateRoot.toString(),
        extrinsicsRoot: header.extrinsicsRoot.toString(),
        blockNumber: header.number.toNumber(),
        hash: header.hash.toString(),
        timestamp: dateTimeString,
        blockAuthor: author
      }
      if (++count !== 256) {
        newBlocks.push(blockHeader)
        this.setState({ blocks: newBlocks })
      }
    });
  }

  render() {
    return (
      <div>
        <div className='note-styles'>
          <p>	&#128161; Get real time block updates - latest block on the top !</p>
        </div>
        {
          this.state.blocks[0] !== undefined ?
            this.state.blocks.slice(0).reverse().slice(0, 2).map((block) => {
              return (
                <div key={block.hash} >
                  <Block block={block} />
                </div>
              )
            }) :
            <img src={loader} style={{ display: 'block', margin: 'auto', width: '300px' }} />
        }
      </div>
    )
  }
}

export default Explorer
