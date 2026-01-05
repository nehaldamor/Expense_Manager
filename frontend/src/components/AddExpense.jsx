import { useState } from "react";
import api from "../api/api";


export default function AddExpense({ refresh }) {
const [form, setForm] = useState({ title: "", amount: "", category: "" });


const add = async () => {
await api.post("/expense", form);
refresh();
};


return (
<div>
<h3>Add Expense</h3>
<input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
<input placeholder="Amount" onChange={(e) => setForm({ ...form, amount: e.target.value })} />
<input placeholder="Category" onChange={(e) => setForm({ ...form, category: e.target.value })} />
<button onClick={add}>Add</button>
</div>
);
}
