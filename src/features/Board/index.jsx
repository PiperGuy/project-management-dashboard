import { forwardRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './components/Column';
import ColumnAdder from './components/ColumnAdder';
import { when, partialRight, moveCard, moveColumn } from '../../common/utils/board.utils';
import ColumnHeader from './components/ColumnHeader';
import DefaultCard from './components/Card';
import { getCard, getCoordinates, isAColumnMove, isMovingAColumnToAnotherPosition, isMovingACardToAnotherPosition, addNewColumn, removeColumn, addCard, removeCard, reorderState } from './boardSlice';
import { useSelector, useDispatch } from 'react-redux';

// HOC
import withDroppableComponent from '../../common/HOC/DroppableComponent';

// Styled components
import { Wrapper } from './styles';

// Constants
const Columns = forwardRef((props, ref) => <div ref={ref} style={{ display: 'flex', whiteSpace: 'nowrap' }} {...props} />);
const DroppableBoard = withDroppableComponent(Columns);

function Board({ onCardDragEnd, onColumnDragEnd, allowAddCard }) {
	const board = useSelector((state) => state.board.value);
	const dispatch = useDispatch();
	console.log({ board });

	const handleOnCardDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveCard, notifyCallback: onCardDragEnd });
	const handleOnColumnDragEnd = partialRight(handleOnDragEnd, {
		moveCallback: moveColumn,
		notifyCallback: onColumnDragEnd
	});
	function handleOnDragEnd({ source, destination, subject }, { moveCallback, notifyCallback }) {
		const reorderedBoard = moveCallback(board, source, destination);
		when(notifyCallback)((callback) => callback(reorderedBoard, subject, source, destination));
		dispatch(reorderState(reorderedBoard));
	}

	async function handleColumnAdd(newColumn) {
		dispatch(addNewColumn(newColumn));
	}

	function handleColumnRemove(column) {
		dispatch(removeColumn(column));
	}

	function handleCardAdd(column, card, options = {}) {
		dispatch(addCard({ column, card, options }));
	}

	async function handleDraftCardAdd(column, card, options = {}) {
		handleCardAdd(column, card, options);
	}

	function handleCardRemove(column, card) {
		dispatch(removeCard({ column, card }));
	}

	return (
		<>
			{board && (
				<BoardContainer onCardDragEnd={handleOnCardDragEnd} onColumnDragEnd={handleOnColumnDragEnd} handleColumnAdd={handleColumnAdd} handleCardRemove={handleCardRemove} onColumnRemove={handleColumnRemove} onCardNew={(column, card) => handleDraftCardAdd(column, card, allowAddCard)}>
					{board}
				</BoardContainer>
			)}
		</>
	);
}

function BoardContainer({ children: board, handleColumnAdd, onColumnRemove, handleCardRemove, onColumnDragEnd, onCardDragEnd, onCardNew }) {
	function handleOnDragEnd(event) {
		const coordinates = getCoordinates(event, board);
		if (!coordinates.source) return;

		isAColumnMove(event.type)
			? isMovingAColumnToAnotherPosition(coordinates) && onColumnDragEnd({ ...coordinates, subject: board.columns[coordinates.source.fromPosition] })
			: isMovingACardToAnotherPosition(coordinates) && onCardDragEnd({ ...coordinates, subject: getCard(board, coordinates.source) });
	}

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Wrapper>
				<DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD'>
					{Array.isArray(board?.columns) &&
						board?.columns.map((column, index) => (
							<Column
								key={column.id}
								index={index}
								renderCard={(column, card, dragging) => {
									return (
										<DefaultCard dragging={dragging} onCardRemove={(card) => handleCardRemove(column, card)}>
											{card}
										</DefaultCard>
									);
								}}
								renderColumnHeader={(column) => <ColumnHeader onColumnRemove={onColumnRemove}>{column}</ColumnHeader>}
								onCardNew={onCardNew}
							>
								{column}
							</Column>
						))}
				</DroppableBoard>
				<ColumnAdder onConfirm={(title, id) => handleColumnAdd({ id, title, cards: [] })} />
			</Wrapper>
		</DragDropContext>
	);
}

export default Board;
