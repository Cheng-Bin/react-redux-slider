import React, { Component } from 'react'

export default class SliderDtos extends Component {

    constructor(props) {
    	super(props)

    	this.handleDotClick = this.handleDotClick.bind(this)
    }

    handleDotClick(i) {
    	var option = i - this.props.nowLocal
    	this.props.turn(option)
    }


    render() {

    	let dotNodes = []
    	let { count, nowLocal } = this.props

    	for (let i = 0; i < count; i++) {
    		dotNodes[i] = (
    			<span
    			    key={`dot${i}`}
    			    className={"slider-dot" + (i === this.props.nowLocal 
    			    	&& " slider-dot-selected" || "")}
    			    onClick={this.handleDotClick(i)}
    			></span>
    		)
    	}

    	return (
    	    <div className="slider-dots-wrap">
    	        {dotNodes}
    	    </div>
    	)
    }

}