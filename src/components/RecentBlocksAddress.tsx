// eslint-disable-next-line
import React, { useEffect, useMemo } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { Blocks } from "../hooks/useOverview";
import useWindowDimensions from "../hooks/useWindowDimension";

interface Props {
  blocks: Blocks[];
  initialPageSize?: number;
}
export const RecentBlocksAddress: React.FC<Props> = ({
  blocks,
  initialPageSize,
}) => {
  const data = useMemo(() => blocks, [blocks]);
  const dims = useWindowDimensions();
  const columns: any = useMemo(
    () => [
      {
        Header: "Block No.",
        accessor: "block_number", // accessor is the "key" in the data
      },
      {
        Header: "Time Elapsed",
        accessor: "mined_at",
      },
      {
        Header: "Sats spent",
        accessor: "sats_spent",
      },
      {
        Header: "Block Status",
        accessor: "block_status",
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
    // getTableProps,
    // getTableBodyProps,
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
      {/* <table className={"small-table"} {...getTableProps()}>
        <thead> */}
      {headerGroups.map((headerGroup: any) => (
        <div
          className={"table-headers table-heads"}
          {...headerGroup.getHeaderGroupProps()}
        >
          {headerGroup.headers.map((column: any) => (
            <p {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render("Header")}
            </p>
          ))}
        </div>
      ))}
      {/* </thead>
        <tbody {...getTableBodyProps()}> */}
      {page.map((row: any) => {
        prepareRow(row);
        return (
          <div className={"table-headers"} {...row.getRowProps()}>
            {row.cells.map((cell: any) => {
              return <p {...cell.getCellProps()}>{cell.render("Cell")}</p>;
            })}
          </div>
        );
      })}
      {/* </tbody>
      </table> */}
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
