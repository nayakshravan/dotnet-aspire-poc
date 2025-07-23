"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Hospital = {
  id: number;
  name: string;
  location: string;
};

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [form, setForm] = useState({ id: 0, name: "", location: "" });
  const [isEditing, setIsEditing] = useState(false);

  const apiBase = "http://localhost:5164/api/hospitals";

  const fetchHospitals = async () => {
    const res = await axios.get(apiBase);
    setHospitals(res.data);
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`${apiBase}/${form.id}`, form);
    } else {
      await axios.post(apiBase, form);
    }
    setForm({ id: 0, name: "", location: "" });
    setIsEditing(false);
    fetchHospitals();
  };

  const handleEdit = (hospital: Hospital) => {
    setForm(hospital);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${apiBase}/${id}`);
    fetchHospitals();
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">🏥 Hospitals</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Hospital Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? "Update Hospital" : "Add Hospital"}
        </button>
      </form>

      <ul className="space-y-4">
        {hospitals.map((h) => (
          <li key={h.id} className="p-4 border rounded shadow flex justify-between">
            <div>
              <p className="font-semibold">{h.name}</p>
              <p className="text-sm text-gray-600">{h.location}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(h)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(h.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
