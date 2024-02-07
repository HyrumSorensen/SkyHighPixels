import React from 'react';
import './Board.css'
import camellogo from './imgs/camel.svg'

function Board() {
  let camelstyle ={
    height: "30px",
    width: "30px"
  }

  return (
    <div className="board">
      <img style={camelstyle} src={camellogo} />
      {/* <img src={camellogo} /> */}

      <div className="d-flex flex flex-row justify-content-center">
        <div className="space space-12">12</div>
        <div className="space space-13">13</div>
        <div className="space space-14">14</div>
        <div className="space space-15">15</div>
        <div className="space space-16">16</div>
        <div className="space space-1">1</div>
        <div className="space space-2">2</div>
        <div className="space space-3">3</div>
      </div>

      <div className="d-flex flex flex-row justify-content-center">
        <div className="space space-11">11</div>
        <div className="space space-10">10</div>
        <div className="space space-9">9</div>
        <div className="space space-8">8</div>
        <div className="space space-7">7</div>
        <div className="space space-6">6</div>
        <div className="space space-5">5</div>
        <div className="space space-4">4</div>
      </div>
    </div>
  );
}

export default Board;
