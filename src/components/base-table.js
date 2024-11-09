import React, { useMemo, useState, useImperativeHandle } from "react";
import Search from "./commons/search";
const BaseTable = (props, ref) => {
  const { body, head, tableBtn, isLoading, searchable } = props;
  const [search, setSearch] = useState("");

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

  useImperativeHandle(
    ref,
    () => ({
      getFilteredData: () => {
        return filteredData;
      },
    }),
    [filteredData]
  );

  return (
    <>
      <div className=" w-full flex flex-col justify-between items-center md:flex-row md:justify-between gap-12 bg-gray-100 px-4 py-2">
        {searchable && (
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
              {filteredData?.map((items, key) => (
                <tr
                  className="group bg-gray-50 hover:bg-gray-100 border-b"
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
    </>
  );
};

export default BaseTable;