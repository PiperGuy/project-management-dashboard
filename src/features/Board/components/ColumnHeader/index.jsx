import { Wrapper, Title } from './styles';

const ColumnHeader = ({ children: column, onColumnRemove }) => {
	return (
		<Wrapper>
			<Title>
				<span>{column.title}</span>
				<span style={{ cursor: 'pointer', fontSize: '32px', lineHeight: '1px' }} onClick={() => onColumnRemove(column)}>
					×
				</span>
			</Title>
		</Wrapper>
	);
};

export default ColumnHeader;
