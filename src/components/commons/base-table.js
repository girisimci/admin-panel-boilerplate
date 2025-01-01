import React, { useState } from "react";

const BaseTable = ({
  head,
  body,
  isLoading,
  searchable = false,
  automaticPagination = false,
  tableBtn,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Arama fonksiyonu
  const filteredData = body?.filter((row) =>
    row.some(
      (cell) =>
        cell &&
        cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sayfalama
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const paginatedData = automaticPagination
    ? filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredData;

  if (isLoading) {
    return (
      <div className="w-full h-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        {searchable && (
          <input
            type="text"
            placeholder="Ara..."
            className="w-full max-w-xs p-2 border rounded text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
        {tableBtn && <div>{tableBtn}</div>}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              {head.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-sm font-semibold text-black"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 text-sm text-black"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {automaticPagination && totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 text-black"
          >
            Önceki
          </button>
          <span className="px-3 py-1 text-black">
            Sayfa {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 text-black"
          >
            Sonraki
          </button>
        </div>
      )}
    </div>
  );
};

export default BaseTable; 