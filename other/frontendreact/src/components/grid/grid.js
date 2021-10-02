import React from 'react';
import './styles.scss';

class Grid extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height,
      squareWidth: this.props.squareWidth,
      sqaureHeight: this.props.squareHeight
    }
  }
  render() {
    let propStyle = {
      width: this.props.width * this.props.squareWidth,
      height: this.props.height * this.props.squareWidth
    }
    return (
      <div className='grid' style={propStyle}>
        {this.props.value}
      </div>
    )
  }
}

export default Grid;
