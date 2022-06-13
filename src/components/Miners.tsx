// eslint-disable-next-line
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { MinerInfo } from "../hooks/useMiningData";
import useWindowDimensions from "../hooks/useWindowDimension";
import GlobalFilter from "./GlobalFilter.jsx";

interface Props {
  blocks: MinerInfo[];
  initialPageSize?: number;
}
export const Miners: React.FC<Props> = ({ blocks, initialPageSize }) => {
  const data = useMemo(() => blocks, [blocks]);
  const dims = useWindowDimensions();

  const [cols, setCols] = useState([
    {
      Header: `Address.`,
      accessor: "stx_address", // accessor is the "key" in the data
      isVisible: true,
    },
    {
      Header: "Total Spent (sats)",
      accessor: "total_burnfee",
      isVisible: true,
      filter: "between",
    },
    {
      Header: "Total Participation",
      accessor: "total_participation",
      isVisible: true,
      filter: "between",
    },
    {
      Header: "Total Block Won",
      accessor: "total_block_reward",
      isVisible: true,
      filter: "between",
    },
    {
      Header: "Total Reward (STX)",
      accessor: "total_stx_reward",
      isVisible: true,
      filter: "between",
    },
  ]);
  const columns: any = useMemo(() => cols, [cols]);
  const tableInstance: any = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
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

    state,
    setGlobalFilter,
    preGlobalFilteredRows,
    nextPage,
    previousPage,
    setPageSize,
    setHiddenColumns,
    state: { pageSize },
  } = tableInstance;
  const { push } = useHistory();

  useEffect(() => {
    setPageSize(initialPageSize || 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPageSize]);

  React.useEffect(() => {
    console.log(columns.filter((column: any) => !column.isVisible));
    setHiddenColumns(
      columns
        .filter((column: any) => !column.isVisible)
        .map((column: any) => column.accessor)
    );
  }, [setHiddenColumns, columns]);

  return (
    <>
      {/* <table id={"long"} {...getTableProps()}> */}
      {/* rendering global filter */}
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        headers={headerGroups[0].headers}
        cols={columns}
        setCols={setCols}
        // filter={NumberRangeColumnFilter}
        setGlobalFilter={setGlobalFilter}
      />
      {/* <thead> */}
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
      {/* </thead> */}
      {/* <tbody {...getTableBodyProps()}> */}
      {page.map((row: any) => {
        prepareRow(row);
        return (
          <div className={"table-headers"} {...row.getRowProps()}>
            {row.cells.map((cell: any) => {
              return (
                <p
                  onClick={() => {
                    push("/miner/address/" + cell.row.original.address);
                  }}
                  {...cell.getCellProps()}
                >
                  {cell.render("Cell")}
                </p>
              );
            })}
          </div>
        );
      })}
      {/* </tbody> */}
      {/* </table> */}
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
