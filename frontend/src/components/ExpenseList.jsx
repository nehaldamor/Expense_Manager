export default function ExpenseList({ expenses }) {
return (
<div>
<h3>Expenses</h3>
{expenses.map((e) => (
<div key={e._id}>
{e.title} - ₹{e.amount} ({e.category})
</div>
))}
</div>
);
}