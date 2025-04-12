import { useState } from "react";
import axios from "axios";
import React from "react";

const AddSeniorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    regNumber: "",
    linkedin: "",
    batch: "",
    branch: "",
    interviewDate: "",
    company: "",
    role: "",
    status: "",
    questionTypes: "",
    interviewExperience: "",
    adviceToJuniors: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      regNumber: formData.regNumber,
      linkedin: formData.linkedin,
      batch: formData.batch,
      branch: formData.branch,
      interviews: formData.company ? [
        {
          date: new Date(formData.interviewDate),
          company: formData.company,
          role: formData.role,
          status: formData.status,
          questionTypes: formData.questionTypes.split(",").map((q) => q.trim()),
          interviewExperience: formData.interviewExperience,
          adviceToJuniors: formData.adviceToJuniors
        }
      ] : []
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}seniors`, payload); // Change to your actual API route
      alert("Senior added successfully!");
      setFormData({
        name: "",
        regNumber: "",
        linkedin: "",
        batch: "",
        branch: "",
        interviewDate: "",
        company: "",
        role: "",
        status: "",
        questionTypes: "",
        interviewExperience: "",
        adviceToJuniors: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error adding senior.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Senior</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "regNumber", "linkedin", "batch", "branch", "company", "role", "status"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field}
            className="w-full border px-3 py-2 rounded"
            required={["name", "regNumber", "linkedin", "batch", "branch"].includes(field)}
          />
        ))}
        <input
          type="datetime-local"
          name="interviewDate"
          value={formData.interviewDate}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="questionTypes"
          value={formData.questionTypes}
          onChange={handleChange}
          placeholder="questionTypes (comma separated)"
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="interviewExperience"
          value={formData.interviewExperience}
          onChange={handleChange}
          placeholder="Interview Experience"
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="adviceToJuniors"
          value={formData.adviceToJuniors}
          onChange={handleChange}
          placeholder="Advice to Juniors"
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSeniorForm;
