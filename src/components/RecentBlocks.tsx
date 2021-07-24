import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Blocks } from "../hooks/useOverview";

interface Props {
  blocks: Blocks[];
}
export const RecentBlocks: React.FC<Props> = ({ blocks }) => {
  const data = useMemo(() => blocks, [blocks]);
  const columns: any = useMemo(
    () => [
      {
        Header: "Block No.",
        accessor: "block_number", // accessor is the "key" in the data
      },
      {
        Header: "Mined",
        accessor: "mined_at",
      },
      {
        Header: "Stats spent",
        accessor: "sats_spent",
      },
      {
        Header: "Winner Address",
        accessor: "winner_address",
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
