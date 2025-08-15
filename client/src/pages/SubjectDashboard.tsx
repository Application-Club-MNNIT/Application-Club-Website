import React, {useEffect, useState} from "react";
import {MouseEffectBackground} from "../components/MouseEffectBackground";
import AnimatedWrapper from "../components/AnimatedWrapper";
import {addSubject, getAllSubjects, removeSubject, Subject} from "../redux/apiCalls/subjectAPI";

const VALID_COURSES = ["MCA", "MSC"] as const;
type CourseType = typeof VALID_COURSES[number];

const SubjectDashboard: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [name, setName] = useState<string>("");
    const [subjectCode, setSubjectCode] = useState<string>("");
    const [course, setCourse] = useState<CourseType>("MCA");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [errors, setErrors] = useState<{
        name?: string;
        subjectCode?: string;
        course?: string;
    }>({});

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        const subjectsData = await getAllSubjects();
        if (subjectsData) {
            setSubjects(subjectsData);
        }
    };

    const validateInputs = () => {
        let valid = true;
        const newErrors: typeof errors = {};

        if (!name.trim()) {
            newErrors.name = "Subject name is required";
            valid = false;
        }

        if (!subjectCode.trim()) {
            newErrors.subjectCode = "Subject code is required";
            valid = false;
        }

        if (!course) {
            newErrors.course = "Course is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleAddSubject = async () => {
        if (!validateInputs()) return;

        const response = await addSubject(name.trim(), subjectCode.trim(), course);
        if (response) {
            setName("");
            setSubjectCode("");
            setCourse("MCA");
            fetchSubjects();
        }
    };

    const handleRemoveSubject = async (id: string) => {
        const response = await removeSubject(id);
        if (response !== null) {
            fetchSubjects();
        }
    };

    const filteredSubjects = subjects.filter((subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.course.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <h2 className="text-2xl font-bold mb-4 text-center font-poltawski">Add Subject</h2>
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                placeholder="Subject Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                type="text"
                                placeholder="Subject Code"
                                value={subjectCode}
                                onChange={(e) => setSubjectCode(e.target.value)}
                                className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            {errors.subjectCode && <p className="text-red-500 text-sm">{errors.subjectCode}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <select
                                value={course}
                                onChange={(e) => setCourse(e.target.value as CourseType)}
                                className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                {VALID_COURSES.map(course => (
                                    <option key={course} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select>
                            {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
                        </div>
                        <button
                            onClick={handleAddSubject}
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 rounded-lg transition"
                        >
                            Add Subject
                        </button>
                    </div>

                    {/* Subject List Section */}
                    <div className="w-full md:w-1/2 p-6">
                        <h2 className="text-2xl font-bold mb-4 text-center font-poltawski">Subjects List</h2>
                        <input
                            type="text"
                            placeholder="Search subjects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 mb-4 rounded-lg bg-neutral-800 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        {filteredSubjects.length === 0 ? (
                            <p className="text-gray-400 text-center">No subjects found.</p>
                        ) : (
                            <ul className="w-full max-h-[400px] overflow-y-auto space-y-3 scrollbar-hide">
                                {filteredSubjects.map((subject) => (
                                    <li
                                        key={subject._id}
                                        className="flex justify-between items-center p-3 bg-neutral-800 rounded-lg"
                                    >
                                        <div>
                                            <h3 className="text-lg font-medium">{subject.name.toUpperCase()}</h3>
                                            <div className="flex gap-2 text-sm text-gray-400">
                                                <span>{subject.subjectCode.toUpperCase()}</span>
                                                <span>•</span>
                                                <span>{subject.course.toUpperCase()}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveSubject(subject._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Remove
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

export default SubjectDashboard;
