import React, { Component } from 'react'

require('./Slider.scss')

import SliderItem from './SliderItem'
import SliderDots from './SliderDots'
import SliderArrows from './SliderArrows'


export default class Slider extends Component {

	constructor(props) {
		super(props)

		this.onTurn = this.onTurn.bind(this)
		this.pausePlay = this.pausePlay.bind(this)
		this.goPlay = this.goPlay.bind(this)

		this.state = {
			nowLocal: 0
		}
	}

	onTurn(n) {
		var itemLen = this.props.items.length
		var _n = this.state.nowLocal + n

		if (_n < 0) {
			_n = _n + itemLen
		}

		if (_n >= itemLen) {
			_n = _n - itemLen
		}

		this.setState({nowLocal: _n})
	}

	goPlay() {
		if (this.props.autoplay) {
			this.autoPlayFlag = setInterval(() => {
				this.onTurn(1)
			}, this.props.delay * 1000)
		}
	}


	pausePlay() {
		clearInterval(this.autoPlayFlag)
	}


	componentDidMount() {
		this.goPlay()
	}


	render() {

		let count = this.props.items.length

		let itemNodes = this.props.items.map((item, index) => {
			return <SliderItem item={item} count={count} key={`item${index}`} />
		})

		let arrowsNode = <SliderArrows onTurn={this.onTurn} />

		let dotsNode = <SliderDots onTurn={this.onTurn} count={count} nowLocal={this.state.nowLocal} />


		return (
		    <div className="slider"
		         onMouseOver={this.props.pause && this.pausePlay || null}
		         onMouseOut={this.props.pause && this.goPlay || null}>
		         <ul style={{
		         	left: -100 * this.state.nowLocal + "%",
		         	transitionDuration: this.props.speed + "s",
		         	width: this.props.items.length * 100 + "%"
		         }}>
		             {itemNodes}
		         </ul>
		         {this.props.arrows && arrowsNode || null}
		         {this.props.dots && dotsNode || null}
		    </div>
		)
	}

}

Slider.defaultProps = {
	speed: 1.5,
	deplay: 3,
	pause: true,
	autoplay: true,
	dots: true,
	arrows: true,
	items: [],
}

Slider.autoPlayFlag = null
