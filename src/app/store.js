import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/Board/boardSlice';

export const store = configureStore({
	reducer: {
		board: boardReducer
	}
});
