import React from "react";
import styled from "styled-components";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationWrapper>
      <span>Page 1 to 3</span>
      {Array.from({ length: totalPages }, (_, index) => (
        <PageButton
          key={index}
          isActive={currentPage === index + 1}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </PageButton>
      ))}
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.isActive ? "skyblue" : "#e0e0e0")};
  color: ${(props) => (props.isActive ? "#fff" : "#000")};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#0056b3" : "#cfcfcf")};
  }
`;
