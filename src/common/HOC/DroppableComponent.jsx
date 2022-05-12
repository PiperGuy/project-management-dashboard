import { Droppable } from 'react-beautiful-dnd';

const withDroppableComponent = (Component) => {
	return ({ children, ...droppableProps }) => {
		return (
			<Droppable {...droppableProps}>
				{(provided) => (
					<Component ref={provided.innerRef} {...provided.droppableProps}>
						{children}
						{provided.placeholder}
					</Component>
				)}
			</Droppable>
		);
	};
};

export default withDroppableComponent;
