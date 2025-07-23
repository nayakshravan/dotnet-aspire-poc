// app/drugs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const apiBase = 'http://localhost:5203/api/drugs'; // Your drugs.api endpoint

export default function DrugsPage() {
  const [drugs, setDrugs] = useState([]);
  const [form, setForm] = useState({
    id: '',
    name: '',
    minimumStock: '',
    maximumStock: '',
    isRecalled: false,
    isExpired: false,
    manufactureDate: '',
    expiryDate: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchDrugs = async () => {
    const res = await axios.get(apiBase);
    setDrugs(res.data);
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      ...form,
      minimumStock: parseInt(form.minimumStock),
      maximumStock: parseInt(form.maximumStock),
      manufactureDate: new Date(form.manufactureDate),
      expiryDate: new Date(form.expiryDate)
    };

    console.log("Payload being sent:", payload);
    if (isEditing) {
      await axios.put(`${apiBase}/${form.id}`, payload);
    } else {
      const { id, ...payloadWithoutId } = payload;
      await axios.post(apiBase, payloadWithoutId);
    }

    setForm({
      id: '',
      name: '',
      minimumStock: '',
      maximumStock: '',
      isRecalled: false,
      isExpired: false,
      manufactureDate: '',
      expiryDate: ''
    });
    setIsEditing(false);
    fetchDrugs();
  };

  const handleEdit = (drug: any) => {
    setForm({
      ...drug,
      manufactureDate: drug.manufactureDate.split('T')[0],
      expiryDate: drug.expiryDate.split('T')[0]
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${apiBase}/${id}`);
    fetchDrugs();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Drugs</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Drug Name"
            value={form.name}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="minimumStock" className="block font-medium mb-1">Min Stock</label>
          <input
            name="minimumStock"
            id="minimumStock"
            type="number"
            placeholder="Min Stock"
            value={form.minimumStock}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="maximumStock" className="block font-medium mb-1">Max Stock</label>
          <input
            name="maximumStock"
            id="maximumStock"
            type="number"
            placeholder="Max Stock"
            value={form.maximumStock}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="manufactureDate" className="block font-medium mb-1">Manufacture Date</label>
          <input
            name="manufactureDate"
            id="manufactureDate"
            type="date"
            value={form.manufactureDate}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="expiryDate" className="block font-medium mb-1">Expiry Date</label>
          <input
            name="expiryDate"
            id="expiryDate"
            type="date"
            value={form.expiryDate}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            name="isRecalled"
            id="isRecalled"
            type="checkbox"
            checked={form.isRecalled}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="isRecalled" className="font-medium">Recalled</label>
        </div>

        <div className="flex items-center">
          <input
            name="isExpired"
            id="isExpired"
            type="checkbox"
            checked={form.isExpired}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="isExpired" className="font-medium">Expired</label>
        </div>
      </div>

        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded">
          {isEditing ? 'Update Drug' : 'Add Drug'}
        </button>
      </form>

      {/* Table */}
      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Min</th>
            <th className="border p-2">Max</th>
            <th className="border p-2">Recalled</th>
            <th className="border p-2">Expired</th>
            <th className="border p-2">MFG Date</th>
            <th className="border p-2">EXP Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug: any) => (
            <tr key={drug.id}>
              <td className="border p-2">{drug.name}</td>
              <td className="border p-2">{drug.minimumStock}</td>
              <td className="border p-2">{drug.maximumStock}</td>
              <td className="border p-2">{drug.isRecalled ? 'Yes' : 'No'}</td>
              <td className="border p-2">{drug.isExpired ? 'Yes' : 'No'}</td>
              <td className="border p-2">{new Date(drug.manufactureDate).toLocaleDateString()}</td>
              <td className="border p-2">{new Date(drug.expiryDate).toLocaleDateString()}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(drug)} className="text-blue-600">Edit</button>
                <button onClick={() => handleDelete(drug.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
