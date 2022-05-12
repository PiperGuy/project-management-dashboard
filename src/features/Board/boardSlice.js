import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { get, set } from 'idb-keyval';
import { addColumn, removeColumn as handleRemoveColumn, addCard as handleAddCard, removeCard as handleRemoveCard } from '../../common/utils/board.utils';

const initialState = {
	value: {
		columns: [
			{
				id: 1,
				title: 'Teams',
				cards: [
					{
						id: 1,
						title: 'Products',
						description: '3 tasks pending to be filled by Raj'
					},
					{
						id: 2,
						title: 'Sales',
						description: 'Send proposals to Puneeth for sales prices'
					}
				]
			},
			{
				id: 2,
				title: 'Products',
				cards: [
					{
						id: 9,
						title: 'UAT testing',
						description: 'Ask engg to setup testing infra'
					}
				]
			}
		]
	}
};

// Thunk functions
export const fetchBoard = createAsyncThunk('board/fetchBoard', async () => {
	const response = await get('board');

	console.log({ response, res: initialState.value });
	if (response) {
		return response;
	} else {
		set('board', initialState.value);
		return initialState.value;
	}
});

export const boardSlice = createSlice({
	name: 'board',
	initialState: { value: { columns: [] } },
	reducers: {
		addNewColumn: (state, action) => {
			const currentState = current(state);
			state.value = addColumn(currentState.value, action.payload);
			set('board', current(state).value);
		},
		removeColumn: (state, action) => {
			const currentState = current(state);
			state.value = handleRemoveColumn(currentState.value, action.payload);
			set('board', current(state).value);
		},
		addCard: (state, action) => {
			const currentState = current(state);
			state.value = handleAddCard(currentState.value, action.payload.column, action.payload.card, action.payload.options);
			set('board', current(state).value);
		},
		removeCard: (state, action) => {
			const currentState = current(state);
			state.value = handleRemoveCard(currentState.value, action.payload.column, action.payload.card);
			set('board', current(state).value);
		},
		reorderState: (state, action) => {
			state.value = action.payload;
			set('board', current(state).value);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchBoard.fulfilled, (state, action) => {
			state.value = action.payload;
		});
	}
});

// Action creators are generated for each case reducer function

export const { addNewColumn, removeColumn, addCard, removeCard, reorderState } = boardSlice.actions;

export default boardSlice.reducer;

function getCoordinates(event, board) {
	if (event.destination === null) return {};

	const columnSource = { fromPosition: event.source.index };
	const columnDestination = { toPosition: event.destination.index };

	if (isAColumnMove(event.type)) {
		return { source: columnSource, destination: columnDestination };
	}

	return {
		source: { ...columnSource, fromColumnId: getColumn(board, event.source.droppableId).id },
		destination: { ...columnDestination, toColumnId: getColumn(board, event.destination.droppableId).id }
	};
}

function isAColumnMove(type) {
	return type === 'BOARD';
}

function getCard(board, sourceCoordinate) {
	const column = board.columns.find((column) => column.id === sourceCoordinate.fromColumnId);
	return column.cards[sourceCoordinate.fromPosition];
}

function getColumn(board, droppableId) {
	return board.columns.find(({ id }) => String(id) === droppableId);
}

function isMovingAColumnToAnotherPosition(coordinates) {
	return coordinates.source.fromPosition !== coordinates.destination.toPosition;
}

function isMovingACardToAnotherPosition(coordinates) {
	return !(coordinates.source.fromPosition === coordinates.destination.toPosition && coordinates.source.fromColumnId === coordinates.destination.toColumnId);
}

export { getCard, getCoordinates, isAColumnMove, isMovingAColumnToAnotherPosition, isMovingACardToAnotherPosition };
