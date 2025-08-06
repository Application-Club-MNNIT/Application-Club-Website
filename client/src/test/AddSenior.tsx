import { useState } from "react";
import axios from "axios";
import React from "react";

const AddSeniorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    regNumber: "",
    linkedin: "",
    batch: "",
    branch: ""
  });

  const [interviews, setInterviews] = useState([
    {
      date: "",
      company: "",
      role: "",
      status: "",
      questionTypes: "",
      interviewExperience: "",
      adviceToJuniors: ""
    }
  ]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterviewChange = (index, e) => {
    const { name, value } = e.target;
    const updatedInterviews = [...interviews];
    updatedInterviews[index][name] = value;
    setInterviews(updatedInterviews);
  };

  const addInterview = () => {
    setInterviews([
      ...interviews,
      {
        date: "",
        company: "",
        role: "",
        status: "",
        questionTypes: "",
        interviewExperience: "",
        adviceToJuniors: ""
      }
    ]);
  };

  const removeInterview = (index) => {
    const updated = interviews.filter((_, i) => i !== index);
    setInterviews(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedInterviews = interviews.map((i) => {
      const formatted = {
        date: new Date(i.date),
        company: i.company,
        role: i.role,
        status: i.status,
        questionTypes: i.questionTypes ? i.questionTypes.split(",").map((q) => q.trim()) : undefined,
        interviewExperience: i.interviewExperience || undefined,
        adviceToJuniors: i.adviceToJuniors || undefined,
      };

      // Remove undefined fields
      Object.keys(formatted).forEach((key) => {
        if (formatted[key] === undefined) {
          delete formatted[key];
        }
      });

      return formatted;
    });

    const payload = {
      ...formData,
      interviews: formattedInterviews
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}seniors`, payload);
      console.log(res.data);

      alert("Senior added successfully!");
      // Reset everything
      setFormData({
        name: "",
        regNumber: "",
        linkedin: "",
        batch: "",
        branch: ""
      });
      setInterviews([
        {
          date: "",
          company: "",
          role: "",
          status: "",
          questionTypes: "",
          interviewExperience: "",
          adviceToJuniors: ""
        }
      ]);

      console.log(formData);
      console.log(interviews);
    } catch (err) {
      console.error(err);
      alert("Error adding senior.");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Senior</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "regNumber", "linkedin", "batch", "branch"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleFormChange}
            placeholder={field}
            className="w-full border px-3 py-2 rounded"
            required
          />
        ))}

        <h3 className="text-lg font-semibold mt-6 mb-2">Interviews</h3>

        {interviews.map((interview, index) => (
          <div key={index} className="border p-4 rounded mb-4 relative bg-gray-50">
            <button
              type="button"
              onClick={() => removeInterview(index)}
              className="absolute top-1 right-1 text-red-500"
              title="Remove Interview"
            >
              ✕
            </button>
            <input
              type="datetime-local"
              name="date"
              value={interview.date}
              onChange={(e) => handleInterviewChange(index, e)}
              className="w-full border px-3 py-2 rounded mb-2"
            />
            {["company", "role", "status", "questionTypes"].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={interview[field]}
                onChange={(e) => handleInterviewChange(index, e)}
                placeholder={field}
                className="w-full border px-3 py-2 rounded mb-2"
              />
            ))}
            <textarea
              name="interviewExperience"
              value={interview.interviewExperience}
              onChange={(e) => handleInterviewChange(index, e)}
              placeholder="Interview Experience"
              className="w-full border px-3 py-2 rounded mb-2"
            />
            <textarea
              name="adviceToJuniors"
              value={interview.adviceToJuniors}
              onChange={(e) => handleInterviewChange(index, e)}
              placeholder="Advice to Juniors"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addInterview}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add Interview
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded block mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSeniorForm;
