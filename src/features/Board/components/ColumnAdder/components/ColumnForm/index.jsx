import { createRef } from 'react';
import { when } from '../../../../../../common/utils/board.utils';
import { Wrapper } from './styles';
function ColumnForm({ onConfirm, onCancel }) {
	const inputColumnTitle = createRef();

	function addColumn(event) {
		event.preventDefault();

		when(inputColumnTitle.current.value)(onConfirm);
		inputColumnTitle.current.value = '';
	}

	return (
		<Wrapper>
			<form onSubmit={addColumn}>
				<input placeholder='Enter list title' type='text' ref={inputColumnTitle} autoFocus />
				<button type='submit'>Add List</button>
			</form>
		</Wrapper>
	);
}

export default ColumnForm;
