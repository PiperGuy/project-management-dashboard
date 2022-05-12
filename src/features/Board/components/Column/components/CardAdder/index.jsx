import { useState } from 'react';
import CardForm from './components/CardForm';
import { Button } from './styles';

export default function CardAdder({ column, onConfirm }) {
	function confirmCard(card) {
		onConfirm(column, card);
		setAddingCard(false);
	}

	const [addingCard, setAddingCard] = useState(false);

	return <>{addingCard ? <CardForm onConfirm={confirmCard} onCancel={() => setAddingCard(false)} /> : <Button onClick={() => setAddingCard(!addingCard)}>Add Card</Button>}</>;
}
