import React from 'react';

export default function Square(props: any) {
  
    return (
      <button  className={props.markWin ? 'square winner': 'square'} onClick={props.onClick}>
        {props.value}
      </button>
    );
};