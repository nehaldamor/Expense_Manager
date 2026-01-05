import { useState } from "react";
import api from "../api/api";

export default function InviteUser() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("manager");

  const invite = async () => {
    await api.post("/invite", { email, role });
    alert("Invite sent");
    setEmail("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="font-semibold mb-3">Invite User</h3>

      <div className="flex gap-3">
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="user@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="manager">Manager</option>
          <option value="agent">Agent</option>
        </select>

        <button
          onClick={invite}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Invite
        </button>
      </div>
    </div>
  );
}
