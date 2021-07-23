import React, { useMemo } from "react";
import { useTable } from "react-table";

export const RecentBlocks: React.FC = () => {
  const data = useMemo(
    () => [
      {
        col1: "#19010",
        col2: "1hr 15 mins",
        col3: "1,000,000",
        col4: "SP4VJD..UDH7SB",
      },
      {
        col1: "#19010",
        col2: "1hr 15 mins",
        col3: "1,000,000",
        col4: "SP4VJD..UDH7SB",
      },
      {
        col1: "#19010",
        col2: "1hr 15 mins",
        col3: "1,000,000",
        col4: "SP4VJD..UDH7SB",
      },
      {
        col1: "#19010",
        col2: "1hr 15 mins",
        col3: "1,000,000",
        col4: "SP4VJD..UDH7SB",
      },
      {
        col1: "#19010",
        col2: "1hr 15 mins",
        col3: "1,000,000",
        col4: "SP4VJD..UDH7SB",
      },
    ],
    []
  );
  const columns: any = useMemo(
    () => [
      {
        Header: "Block No.",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Mined",
        accessor: "col2",
      },
      {
        Header: "Stats spent",
        accessor: "col3",
      },
      {
        Header: "Winner Address",
        accessor: "col4",
      },
    ],
    []
  );
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup: any) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell: any) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
