import React from 'react';
import NumberCounterGroup from './numberCounterGroup';
import {AccentBeat, RegularBeat} from './audio';

class AppBody extends React.Component {
	state = {
		beatsPerMinute: 	100,
		beatsPerMeasure: 	4,
		currentBeat: 		0,
		isPlaying: 			false,
		randomNote: 		null
	};

	// static vars
	notes 					= ["Ab","A","A#","Bb","B","C","C#","Dd","D","D#","Eb","E","F","F#","Gb","G","G#"];

	// util
	getRandomItemFromArray 	= arr => arr[Math.floor( Math.random() * arr.length )];
	
	// loop
	runTimer				= () => this.playbackTimer = setTimeout( this.runTimerCallback, ( 1000 * 60 ) / this.state.beatsPerMinute );
	loopBeat 				= () => this.setState( { currentBeat: this.state.currentBeat >= this.state.beatsPerMeasure ? 1 : this.state.currentBeat + 1 }, this.loopBeatCallback );
	runTimerCallback 		= () => ( this.loopBeat(), this.runTimer() );
	loopBeatCallback 		= () => ( this.setRandomNote(), this.soundBeep() );
	setRandomNote 			= () => this.state.currentBeat === 1 && this.setState( { randomNote: this.getRandomItemFromArray(this.notes) } );
	soundBeep 				= () => this.state.currentBeat === 1 ? AccentBeat.play() : RegularBeat.play();

	// user interactions
	changeCounter 			= ( type, direction ) => this.setState( { [type]: direction === '-' ? this.state[type] - 1 : this.state[type] + 1 } );
	changeBeatsPerMinute 	= e => this.setState( { beatsPerMinute: e.currentTarget.value } );
	changeBeatsPerMeasure 	= e => this.setState( { beatsPerMeasure: e.currentTarget.value } );
	togglePlayback 			= e => {
		this.setState( { isPlaying: !this.state.isPlaying } );
		if( !this.playbackTimer ){
			this.runTimer();
			this.loopBeat();
		} else {
			clearTimeout( this.playbackTimer );
			this.playbackTimer = null;
		}
	};

	render () {
		const state = this.state;
		return (
			<div>
				<div>
					<NumberCounterGroup type="beatsPerMinute" value={state.beatsPerMinute} handleClick={this.changeCounter} handleChange={this.changeBeatsPerMinute} />
					<NumberCounterGroup type="beatsPerMeasure" value={state.beatsPerMeasure} handleClick={this.changeCounter} handleChange={this.changeBeatsPerMeasure} />
				</div>				
				<button onClick={this.togglePlayback}>{state.isPlaying ? 'Stop' : 'Start'}</button>
				{state.currentBeat > 0 && <h1>{state.currentBeat}</h1>}
				{state.randomNote && <div>{state.randomNote}</div>}
			</div>
		);
	}
}

export default AppBody;
