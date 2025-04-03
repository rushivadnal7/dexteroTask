import React, { useState } from "react";
import { useSelector } from "react-redux";
import Default from "../layout/Default";
import Pagination from "../components/Pagination";
import {
  AccountWrapper,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  SearchInput,
  ActionButton,
  // Dropdown,
  // DropdownItem,
} from "../wrappers/account";
import { FaFileExcel, FaFilter, FaEllipsisV } from "react-icons/fa";
import * as XLSX from "xlsx";
import styled from "styled-components";

const Accounts = () => {
  const accounts = useSelector((state) => state.accounts?.accounts || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const recordsPerPage = 10;

  const filteredAccounts = accounts
    .filter(
      (account) =>
        account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const valueA = a[sortConfig.key]?.toString().toLowerCase();
      const valueB = b[sortConfig.key]?.toString().toLowerCase();
      if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  const toggleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const totalPages = Math.ceil(filteredAccounts.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredAccounts.slice(indexOfFirstRecord, indexOfLastRecord);

  const exportToExcel = () => {
    const dataToExport = filteredAccounts.map(({ accountName, email, phone, website, industry, accountStatus, remark }) => ({
      "Account Name": accountName,
      "Email": email,
      "Phone No.": phone,
      "Website": website,
      "Industry": industry,
      "Account Status": accountStatus ? "Active" : "Inactive",
      "Remark": remark
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Accounts");

    XLSX.writeFile(workbook, "Accounts.xlsx");
  };

  return (
    <Default>
      <AccountWrapper>
        <Header>
          <Button active>Account</Button>
          <Button>Create</Button>
        </Header>
        <TopBar>
          <h1>Accounts List</h1>
          <Actions>
            <FaFileExcel onClick={exportToExcel} />
            <div>
              <FaFilter onClick={() => setIsFilterOpen(!isFilterOpen)} />
              {isFilterOpen && (
                <Dropdown>
                  <DropdownItem onClick={() => toggleSort("accountName")}>Sort by Name</DropdownItem>
                  <DropdownItem onClick={() => toggleSort("email")}>Sort by Email</DropdownItem>
                  <DropdownItem onClick={() => toggleSort("phone")}>Sort by Phone</DropdownItem>
                </Dropdown>
              )}
            </div>
            <SearchInput
              type="text"
              placeholder="Search Here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Actions>
        </TopBar>

        <TableContainer>
          <Table>
            <thead>
              <TableRow header>
                <TableHeader onClick={() => toggleSort("accountName")}>Account Name</TableHeader>
                <TableHeader onClick={() => toggleSort("email")}>Email</TableHeader>
                <TableHeader onClick={() => toggleSort("phone")}>Phone No.</TableHeader>
                <TableHeader>Website</TableHeader>
                <TableHeader>Industry</TableHeader>
                <TableHeader>Account Status</TableHeader>
                <TableHeader>Remark</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {currentRecords.map((account, index) => (
                <TableRow key={index} highlight={index === 0}>
                  <TableCell>{account.accountName}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>{account.phone}</TableCell>
                  <TableCell>
                    <a href={account.website} target="_blank" rel="noopener noreferrer">
                      {account.website}
                    </a>
                  </TableCell>
                  <TableCell>{account.industry}</TableCell>
                  <TableCell>{account.accountStatus ? "true" : "false"}</TableCell>
                  <TableCell>{account.remark}</TableCell>
                  <TableCell>
                    <ActionButton>
                      <FaEllipsisV />
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </AccountWrapper>
    </Default>
  );
};

export default Accounts;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  /* margin-bottom: 10px; */
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  position: relative;

  svg {
    font-size: 20px;
    cursor: pointer;
  }
`;

const Dropdown = styled.div`
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

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
