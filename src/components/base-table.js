import React, { useMemo, useState, useImperativeHandle } from "react";
import Search from "./commons/search";

const BaseTable = (props, ref) => {
  const { body, head, tableBtn, isLoading, searchable } = props;
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    return (
      body &&
      body.filter((items) =>
        items.some(
          (item) =>
            item &&
            item
              .toString()
              .toLocaleLowerCase("TR")
              .includes(search.toLocaleLowerCase("TR"))
        )
      )
    );
  }, [body, search]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData?.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const pageCount = Math.ceil((filteredData?.length || 0) / itemsPerPage);

  useImperativeHandle(
    ref,
    () => ({
      getFilteredData: () => {
        return filteredData;
      },
    }),
    [filteredData]
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= pageCount) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-between items-center md:flex-row md:justify-between gap-12 bg-gray-100 px-4 py-2">
        {searchable && (
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        )}
        {tableBtn}
      </div>
      <div className="w-full border rounded bg-gray-100 overflow-auto">
        {isLoading ? (
          <div className="flex w-full items-center justify-center h-full m-auto">
            loading...
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                {head.map((h, index) => (
                  <th
                    className={`text-left text-sm font-semibold text-gray-500 bg-gray-100 p-3 border-b whitespace-nowrap ${
                      h.width ? `w-[${h.width}]` : ""
                    }`}
                    key={index}
                  >
                    {h.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((items, key) => (
                <tr
                  className="group bg-gray-50 hover:bg-gray-100 border-b text-black"
                  key={key}
                >
                  {items?.map((item, key) => (
                    <td key={key}>
                      <div className="text-sm my-3 px-3">
                        {Array.isArray(item) ? (
                          <div className="flex items-center gap-x-5 ">
                            {item}
                          </div>
                        ) : (
                          item
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center justify-between gap-4 my-4 ">
        <button
          className="  px-1 md:px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Önceki
        </button>
        <span className="text-sm text-gray-700">
          Sayfa {currentPage} / {pageCount}
        </span>
        <button
          className="px-1 md:px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          Sonraki
        </button>
      </div>
    </>
  );
};

export default React.forwardRef(BaseTable);
