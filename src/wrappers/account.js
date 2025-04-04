import styled from "styled-components";

export const AccountWrapper = styled.div`
  width: 80% ;
  height: 100%;
  padding: 20px;
  background: #fff;
  margin-left: 250px;
  overflow-x: hidden;

  @media (max-width: 768px) {
    width: 90%;
    margin-left: 40px;
  }

`;

export const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 6px;
  border: 1px solid #ddd;
  height: max-content;
  font-size: smaller;
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  background: ${(props) => (props.highlight ? "skyblue" : "transparent")};
  &:nth-child(even) {
    background: #f7f7f7;
  }
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  background: #f5f5f5;
  border-bottom: 2px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;

  a{
    color: black;
    text-decoration: none;
  }
`;

export const Button = styled.button`
  background: ${(props) => (props.active ? "skyblue" : "#eee")};
  color: ${(props) => (props.active ? "#3366ff" : "#333")};
  font-size: 14px;
  padding: 8px 15px;
  margin: 2px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:hover {
    background: #ddd;
  }
`;

export const SearchInput = styled.input`
  padding: 7px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #555;

  &:hover {
    color: #000;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  border-radius: 5px;
  top: 35px;
  right: 0;
  width: 180px;
`;

export const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;