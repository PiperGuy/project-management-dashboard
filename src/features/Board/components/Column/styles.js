import styled from '@emotion/styled';

export const Wrapper = styled.div`
	height: 100%;
	min-height: 28px;
	border: 1px solid #ccc;
	border-radius: 15px;
	display: inline-block;
	vertical-align: top;
	padding: 15px 18px 15px 5px;

	background-color: #eee;
	margin: 5px;
	input {
		&:focus {
			outline: none;
		}
	}
`;

export const Placeholder = styled.div`
	box-sizing: border-box;
	max-width: 250px;
	min-width: 250px;
`;
