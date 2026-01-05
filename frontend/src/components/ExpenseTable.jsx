import api from "../api/api";

export default function ExpenseTable({ expenses, role, refresh }) {
  const deleteExpense = async (id) => {
    await api.delete(`/expense/${id}`);
    refresh();
  };

  return (
    <div className="bg-white rounded-lg shadow mt-6 overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Amount</th>
            {role === "admin" && <th className="p-3">Action</th>}
          </tr>
        </thead>

        <tbody>
          {expenses.map((e) => (
            <tr key={e._id} className="border-t">
              <td className="p-3">{e.title}</td>
              <td className="p-3">{e.category}</td>
              <td className="p-3 font-semibold">₹{e.amount}</td>

              {role === "admin" && (
                <td className="p-3">
                  <button
                    onClick={() => deleteExpense(e._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
