// components/UserTable.js
const UserTable = ({ users }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6">ID</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Specialization</th>
            <th className="py-3 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="py-3 px-6">{user.id}</td>
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.gender}</td>
              <td className="py-3 px-6 text-right">
                <button className="bg-gray-600 text-white px-3 py-1 rounded-md mr-2 hover:bg-gray-700 transition">
                  Edit
                </button>
                <button className="bg-gray-800 text-white px-3 py-1 rounded-md hover:bg-black transition">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
