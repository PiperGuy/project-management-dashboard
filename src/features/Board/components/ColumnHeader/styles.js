import styled from '@emotion/styled';

export const Wrapper = styled.div`
	padding-bottom: 10px;
	font-weight: bold;

	input {
		&:focus {
			outline: none;
		}
	}
`;

export const Button = styled.button`
	color: #333333;
	background-color: #ffffff;
	border-color: #cccccc;

	&:hover,
	&:focus,
	&:active {
		background-color: #e6e6e6;
	}
`;

export const Title = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	margin-bottom: 20px;
	font-size: 20px;
	font-weight: 500;
`;
