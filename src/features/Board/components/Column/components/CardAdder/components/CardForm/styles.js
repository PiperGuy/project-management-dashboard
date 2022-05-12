import styled from '@emotion/styled';

export const Wrapper = styled.div`
	box-sizing: border-box;
	max-width: 250px;
	min-width: 250px;
	border-radius: 3px;
	background-color: #fff;
	padding: 10px;
	margin-bottom: 7px;
`;

export const Title = styled.input`
	font-weight: bold;
	padding-bottom: 5px;
	font-weight: bold;
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 0px;
`;

export const Description = styled.input`
	width: 100%;
	margin-top: 10px;
`;

export const ButtonWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 5px;
`;

export const Button = styled.button`
	background-color: #eee;
	border: none;
	padding: 5px;
	width: 45%;
	margin-top: 5px;
	border-radius: 3px;
	&:hover {
		transition: 0.3s;
		cursor: pointer;
		background-color: #ccc;
	}
`;
