import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import AddExpense from "../components/AddExpense";
import ExpenseTable from "../components/ExpenseTable";
import InviteUser from "../components/InviteUser";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = async () => {
    const res = await api.get("/expense");
    setExpenses(res.data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        {user?.role === "admin" && <InviteUser />}

        {(user?.role === "admin" || user?.role === "manager") && (
          <AddExpense refresh={loadExpenses} />
        )}

        <ExpenseTable
          expenses={expenses}
          role={user?.role}
          refresh={loadExpenses}
        />
      </div>
    </div>
  );
}
