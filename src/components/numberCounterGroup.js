import React from 'react';

const NumberCounterGroup = (props) => {
	return (
		<div>
			<button onClick={props.handleClick.bind(null, props.type, '-')}>-</button>
			<input value={props.value} onChange={props.handleChange} />
			<button onClick={props.handleClick.bind(null, props.type, '+')}>+</button>
		</div>	
	);
}

export default NumberCounterGroup;