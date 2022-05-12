import styled from '@emotion/styled';

export const Wrapper = styled.div`
	padding: 15px;
	border-radius: 12px;
	background-color: #eee;
	margin: 5px;
	min-width: 230px;
	form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		button {
			margin-top: 10px;
			width: 100px;

			background-color: black;
			cursor: pointer;
			border: 1px solid #ccc;
			transition: 0.3s;
			padding: 7px;
			border-radius: 3px;
			font-size: 14px;
			margin-bottom: 10px;
			font-weight: bold;
			color: white;
			&:hover {
				background-color: #444;
			}
		}
	}
	input {
		border: none;
		&:focus {
			outline: none;
		}
	}
`;
