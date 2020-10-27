import React from 'react'
import './Block.css'

function Block({ block }) {
  return (
    <div className='container'>
      <div className='block-details'>
        <p><b>Block Number</b> - {block.blockNumber}</p>
        <p><b>Parent Hash</b> - {block.parentHash}</p>
        <p><b>Hash</b> - {block.hash}</p>
        <p><b>State Root</b> - {block.stateRoot}</p>
        <p><b>Extrinsics Root</b> - {block.extrinsicsRoot}</p>
        <p><b>Block Author</b> - {block.blockAuthor}</p>
        <p><b>Timestamp</b> - {block.timestamp}</p>
      </div>
    </div>
  )
}

export default Block
