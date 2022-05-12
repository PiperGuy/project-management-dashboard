import { nanoid } from 'nanoid';
import ColumnForm from './components/ColumnForm';

function ColumnAdder({ onConfirm }) {
	function confirmColumn(title) {
		onConfirm(title, nanoid());
	}

	return <ColumnForm onConfirm={confirmColumn} />;
}

export default ColumnAdder;
