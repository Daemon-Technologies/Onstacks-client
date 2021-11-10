import React, { useEffect, useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import useWindowDimensions from "../hooks/useWindowDimension";

interface Tokens {
  token: string;
  total_tokens: number;
}
interface Props {
  tokens: Tokens[];
  initialPageSize?: number;
}
export const AddressTokens: React.FC<Props> = ({ tokens, initialPageSize }) => {
  const data = useMemo(() => tokens, [tokens]);
  const dims = useWindowDimensions();

  const columns: any = useMemo(
    () => [
      {
        Header: `Token Name.`,
        accessor: "token", // accessor is the "key" in the data
      },
      {
        Header: "Total token amount",
        accessor: "total_tokens",
      },
    ],
    []
  );
  const tableInstance: any = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    // pageOptions,
    // pageCount,
    // gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageSize },
  } = tableInstance;

  useEffect(() => {
    setPageSize(initialPageSize || 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPageSize]);
  return (
    <>
      <table id={"long"} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <div>
          Showing
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 15, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          {dims.width > 550 && <p>items per page</p>}
        </div>
        {/* {dims.width > 550 && (
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
        )} */}
        <div>
          {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"First"}
          </button>{" "} */}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"Previous"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {"Next"}
          </button>{" "}
          {/* <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {"End"}
          </button> */}
        </div>
      </div>
    </>
  );
};
