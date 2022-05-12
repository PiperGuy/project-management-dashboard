import { forwardRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Card from './components/Card';
import withDroppableComponent from '../../../../common/HOC/DroppableComponent';
import CardAdder from './components/CardAdder';
import { pickPropOut } from '../../../../common/utils/board.utils';

import { Wrapper, Placeholder } from './styles';

const ColumnEmptyPlaceholder = forwardRef((props, ref) => <div ref={ref} style={{ minHeight: 'inherit', height: 'inherit' }} {...props} />);

const DroppableColumn = withDroppableComponent(ColumnEmptyPlaceholder);

function Column({ children, index: columnIndex, renderCard, renderColumnHeader, onCardNew }) {
	return (
		<Draggable draggableId={`column-draggable-${children.id}`} index={columnIndex}>
			{(columnProvided) => {
				const draggablePropsWithoutStyle = pickPropOut(columnProvided.draggableProps, 'style');

				return (
					<Wrapper
						ref={columnProvided.innerRef}
						{...draggablePropsWithoutStyle}
						style={{
							...columnProvided.draggableProps.style
						}}
					>
						<div {...columnProvided.dragHandleProps}>{renderColumnHeader(children)}</div>

						<DroppableColumn droppableId={String(children.id)}>
							{children.cards.length ? (
								children.cards.map((card, index) => (
									<Card key={card.id} index={index} renderCard={(dragging) => renderCard(children, card, dragging)}>
										{card}
									</Card>
								))
							) : (
								<Placeholder />
							)}
						</DroppableColumn>
						<CardAdder column={children} onConfirm={onCardNew} />
					</Wrapper>
				);
			}}
		</Draggable>
	);
}

export default Column;
