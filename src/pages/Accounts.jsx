import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTable, useSortBy, usePagination } from "react-table";
import Default from "../layout/Default";
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
} from "../wrappers/account";
import { FaFileExcel, FaFilter, FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";
import styled from "styled-components";
import { deleteAccount, updateAccount } from "../features/accountSlice";

const Accounts = () => {
  const accounts = useSelector((state) => state.accounts?.accounts || []);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) =>
      Object.values(account).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [accounts, searchTerm]);

  const data = useMemo(
    () =>
      filteredAccounts.map((account) => {
        let dateObj = new Date(account.date);

        if (isNaN(dateObj.getTime()) && typeof account.date === "string" && account.date.includes("-")) {
          const [day, month, year] = account.date.split("-");
          dateObj = new Date(`${year}-${month}-${day}`);
        }

        return {
          ...account,
          dateObj,
          formattedDate: !isNaN(dateObj.getTime())
            ? dateObj.toLocaleDateString("en-GB").split("/").join("-")
            : "Invalid Date",
        };
      }),
    [filteredAccounts]
  );


  const handleDelete = (id) => {
    dispatch(deleteAccount(id));
  };

  const handleEdit = (account) => {
    setEditId(account.id);
    setEditedData(account);
  };

  const handleChange = (e, key) => {
    setEditedData({ ...editedData, [key]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateAccount({ id: editId, updatedData: editedData }));
    setEditId(null);
    setEditedData({});
  };

  const columns = useMemo(
    () => [
      {
        Header: "Account Name",
        accessor: "accountName",
        Cell: ({ row }) =>
          row.original.id === editId ? (
            <input
              type="text"
              value={editedData.accountName || ""}
              onChange={(e) => handleChange(e, "accountName")}
            />
          ) : (
            row.original.accountName
          ),
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ row }) =>
          row.original.id === editId ? (
            <input
              type="email"
              value={editedData.email || ""}
              onChange={(e) => handleChange(e, "email")}
            />
          ) : (
            row.original.email
          ),
      },
      {
        Header: "Phone No.",
        accessor: "phone",
        Cell: ({ row }) =>
          row.original.id === editId ? (
            <input
              type="text"
              value={editedData.phone || ""}
              onChange={(e) => handleChange(e, "phone")}
            />
          ) : (
            row.original.phone
          ),
      },
      {
        Header: "Website",
        accessor: "website",
        Cell: ({ row }) =>
          row.original.id === editId ? (
            <input
              type="text"
              value={editedData.website || ""}
              onChange={(e) => handleChange(e, "website")}
            />
          ) : (
            row.original.website
          ),
      },
      {
        Header: "Date",
        accessor: "dateObj",
        sortType: "datetime",
        Cell: ({ row }) =>
          row.original.id === editId ? (
            <input
              type="text"
              value={editedData.date || ""}
              onChange={(e) => handleChange(e, "date")}
            />
          ) : (
            row.original.formattedDate
          ),
      },
      {
        Header: "Industry",
        accessor: "industry",
        Cell: ({ row }) =>
          row.original.id === editId ? (
            <input
              type="text"
              value={editedData.industry || ""}
              onChange={(e) => handleChange(e, "industry")}
            />
          ) : (
            row.original.industry
          ),
      },
      {
        Header: "Account Status",
        accessor: "accountStatus",
        Cell: ({ row }) =>
          row.original.id === editId ? (
            <select
              value={editedData.accountStatus}
              onChange={(e) => handleChange(e, "accountStatus")}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          ) : row.original.accountStatus ? (
            "Active"
          ) : (
            "Inactive"
          ),
      },
      {
        Header: "Remark",
        accessor: "remark",
        Cell: ({ row }) =>
          row.original.id === editId ? (
            <input
              type="text"
              value={editedData.remark || ""}
              onChange={(e) => handleChange(e, "remark")}
            />
          ) : (
            row.original.remark
          ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) =>
          row.original.id === editId ? (
            <>
              <ActionButton onClick={handleSave}>Save</ActionButton>
              <ActionButton onClick={() => setEditId(null)}>Cancel</ActionButton>
            </>
          ) : (
            <>
              <ActionButton onClick={() => handleEdit(row.original)}>
                <FaEdit />
              </ActionButton>
              <ActionButton onClick={() => handleDelete(row.original.id)}>
                <FaTrash />
              </ActionButton>
            </>
          ),
      },
    ],
    [editId, editedData]
  );


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    pageOptions,
    gotoPage,
    state: { pageIndex },
    setPageSize: setTablePageSize,
    toggleSortBy,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize },
    },
    useSortBy,
    usePagination
  );

  const exportToExcel = () => {
    let sortedData = [...filteredAccounts];

    if (sortConfig && sortConfig.key) {
      sortedData.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (sortConfig.direction === "asc") return valA > valB ? 1 : -1;
        if (sortConfig.direction === "desc") return valA < valB ? 1 : -1;
        return 0;
      });
    }

    const dataToExport = sortedData.map(({ accountName, email, phone, website, industry, accountStatus, remark }) => ({
      "Account Name": accountName,
      "Email": email,
      "Phone No.": phone,
      "Website": website,
      "Industry": industry,
      "Account Status": accountStatus ? "Active" : "Inactive",
      "Remark": remark,
    }));

    if (dataToExport.length === 0) {
      alert("No data to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Accounts");
    XLSX.writeFile(workbook, "Accounts.xlsx");
  };

  const toggleSort = (key) => {
    setSortConfig((prev) => {
      const isAsc = prev.key === key ? !prev.direction : false;
      toggleSortBy(key, isAsc);
      return { key, direction: isAsc };
    });
    setIsFilterOpen(false);
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
          <Table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                    </TableHeader>

                  ))}
                </TableRow>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </TableContainer>

        <PaginationContainer>
          <RowsPerPage>
            Rows per page:
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setTablePageSize(Number(e.target.value));
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </RowsPerPage>

          <PaginationControls>
            <Button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
              {"<<"}
            </Button>
            <Button disabled={!canPreviousPage} onClick={() => previousPage()}>
              {"<"}
            </Button>
            <span>
              Page {pageIndex + 1} of {pageOptions.length}
            </span>
            <Button disabled={!canNextPage} onClick={() => nextPage()}>
              {">"}
            </Button>
            <Button disabled={!canNextPage} onClick={() => gotoPage(pageOptions.length - 1)}>
              {">>"}
            </Button>
          </PaginationControls>
        </PaginationContainer>
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
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