import { useRef } from 'react';
import { when } from '../../../../../../../../common/utils/board.utils';
import { nanoid } from 'nanoid';
// Styled components
import { Wrapper, Title, Description, Button, ButtonWrapper } from './styles';

function CardForm({ onConfirm, onCancel }) {
	const inputCardTitle = useRef();
	const inputCardDescription = useRef();

	function addCard(event) {
		event.preventDefault();
		when(inputCardTitle.current.value)((value) => {
			onConfirm({ id: nanoid(), title: value, description: inputCardDescription.current.value });
		});
	}

	return (
		<Wrapper>
			<form onSubmit={addCard}>
				<Title placeholder='Enter card title' name='title' autoFocus ref={inputCardTitle} />
				<Description placeholder='Enter the text for this card' name='description' ref={inputCardDescription} />
				<ButtonWrapper>
					<Button type='submit'>Add</Button>
					<Button type='button' onClick={onCancel}>
						Cancel
					</Button>
				</ButtonWrapper>
			</form>
		</Wrapper>
	);
}

export default CardForm;
