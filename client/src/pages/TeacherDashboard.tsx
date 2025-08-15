import React, {useEffect, useState} from "react";
import {MouseEffectBackground} from "../components/MouseEffectBackground";
import AnimatedWrapper from "../components/AnimatedWrapper";
import {addTeacher, getAllTeachers, removeTeacher, Teacher} from "../redux/apiCalls/teacherAPI";
import {CgClose} from "react-icons/cg";

const TeacherPage: React.FC = () => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

    // Fetch all teachers on load
    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const teachersData = await getAllTeachers();
            setTeachers(teachersData);
        } catch (err) {
            console.error("Error fetching teachers:", err);
        }
    };

    const validateInputs = () => {
        let valid = true;
        let newErrors: { name?: string; email?: string } = {};

        if (!name.trim()) {
            newErrors.name = "Name is required.";
            valid = false;
        } else if (!/^[A-Za-z ]+$/.test(name)) {
            newErrors.name = "Name can only contain letters and spaces.";
            valid = false;
        }

        if (!email.trim()) {
            newErrors.email = "Email is required.";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleAddTeacher = async () => {
        if (!validateInputs()) return;

        try {
            const response = await addTeacher(name, email);
            if (response.status === "success") {
                setName("");
                setEmail("");
                setErrors({});
                fetchTeachers(); // Refresh list
            }
        } catch (err: any) {
            console.error("Add teacher error:", err);
        }
    };

    const handleRemoveTeacher = async (id: string) => {
        try {
            const response = await removeTeacher(id);
            if (response.status === "success") {
                fetchTeachers(); // Refresh list
            }
        } catch (err: any) {
            alert("Could not delete teacher.");
        }
    };

    const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16">
            <MouseEffectBackground/>
            <AnimatedWrapper>
                <div
                    className="bg-neutral-900 text-white p-8 sm:p-10 min-w-[95vw] sm:min-w-[600px] md:min-w-[700px] lg:min-w-[800px] rounded-lg shadow-lg flex flex-col md:flex-row gap-6">
                    {/* Input Section */}
                    <div
                        className="w-full md:w-1/2 p-6 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-gray-700">
                        <h2 className="text-2xl font-bold mb-4 text-center font-poltawski">Add Teacher</h2>
                        <input
                            type="text"
                            placeholder="Teacher Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        <input
                            type="email"
                            placeholder="Teacher Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        <button
                            onClick={handleAddTeacher}
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 rounded-lg transition">
                            Add Teacher
                        </button>
                    </div>

                    {/* Teacher List Section */}
                    <div className="w-full md:w-1/2 p-6">
                        <h2 className="text-2xl font-bold mb-4 text-center font-poltawski">Teachers List</h2>
                        <input
                            type="text"
                            placeholder="Search teacher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 mb-4 rounded-lg bg-neutral-800 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        {filteredTeachers.length === 0 ? (
                            <p className="text-gray-400 text-center">No teachers found.</p>
                        ) : (
                            <ul className="w-full max-h-[200px] overflow-y-auto space-y-3 scrollbar-hide">
                                {filteredTeachers.map((teacher) => (
                                    <li
                                        key={teacher._id}
                                        className="flex justify-between items-center p-3 bg-neutral-800 rounded-lg">
                                        <div>
                                            <h3 className="text-lg font-medium">{teacher.name}</h3>
                                            <p className="text-gray-400">{teacher.email}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveTeacher(teacher._id)}
                                            title="delete"
                                            className="bg-red-500 hover:bg-red-600 text-white rounded-full transition relative bottom-4 flex items-center justify-center p-0.5 cursor-pointer"
                                        >
                                            <CgClose/>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </AnimatedWrapper>
        </div>
    );
};

export default TeacherPage;
