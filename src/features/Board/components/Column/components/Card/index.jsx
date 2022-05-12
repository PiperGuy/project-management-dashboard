import { Draggable } from 'react-beautiful-dnd';

function Card({ children, index, renderCard }) {
	return (
		<Draggable draggableId={String(children.id)} index={index}>
			{(provided, { isDragging }) => {
				return (
					<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
						<div style={{ display: 'inline-block', whiteSpace: 'normal' }}>{renderCard(isDragging)}</div>
					</div>
				);
			}}
		</Draggable>
	);
}

export default Card;
