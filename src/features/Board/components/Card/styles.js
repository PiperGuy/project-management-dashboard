import styled from '@emotion/styled';

export const Wrapper = styled.div`
	box-sizing: border-box;
	max-width: 250px;
	min-width: 250px;
	border-radius: 3px;
	background-color: #fff;
	padding: 15px;
	margin-bottom: 7px;
	box-shadow: {props => props.dragging ? '2px 2px grey' : '2px 2px grey'};'} ;
`;

export const Title = styled.div`
	padding-bottom: 5px;
	font-weight: 400;
	display: flex;
	justify-content: space-between;
`;

export const Description = styled.div`
	padding-top: 10px;
	font-size: 14px;
`;
