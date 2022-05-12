import { Wrapper, Title, Description } from './styles';

const Card = ({ children: card, dragging, onCardRemove }) => {
	return (
		<Wrapper dragging={dragging}>
			<span>
				<Title>
					<span>{card.title}</span>

					<span style={{ cursor: 'pointer', fontSize: '32px', lineHeight: '1px' }} onClick={() => onCardRemove(card)}>
						×
					</span>
				</Title>
			</span>
			<Description>{card.description}</Description>
		</Wrapper>
	);
};

export default Card;
