import React from 'react'
import './Nav.css'
import polkadotImg from '../../img/polkadot.png'
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='container'>
      <div className='heading-styles'>
        <img src={polkadotImg} />
        <h4>Block Explorer</h4>
      </div>
      <div className='navbar-styles'>
        <Link to='/polkadot-block-explorer'>
          <button>Explorer</button>
        </Link>
        <Link to='/search'>
          <button>Search Block</button>
        </Link>
      </div>
    </div>
  )
}

export default Nav
