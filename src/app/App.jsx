import Board from '../features/Board';
import { Header } from './style';
import { fetchBoard } from '../features/Board/boardSlice';
import { clear } from 'idb-keyval';
import { useDispatch } from 'react-redux';

const App = () => {
	const dispatch = useDispatch();

	const OnReset = () => {
		clear();
		dispatch(fetchBoard());
	};
	return (
		<div className='App'>
			<Header>
				<p>Dashboard</p>
				<button onClick={OnReset}>Reset</button>
			</Header>
			<Board />
		</div>
	);
};

export default App;
