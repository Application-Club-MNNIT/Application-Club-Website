import React, {useEffect, useState} from "react";
import {MouseEffectBackground} from "../components/MouseEffectBackground";
import AnimatedWrapper from "../components/AnimatedWrapper";
import {createPaperRequest} from "../redux/apiCalls/paperAPI";
import {getAllSubjects, Subject} from "../redux/apiCalls/subjectAPI";
import {getAllTeachers, Teacher} from "../redux/apiCalls/teacherAPI";

const EXAM_TYPES = ["Mid-Sem", "End-Sem", "Practical", "Other"] as const;
const COURSES = ["MCA", "MSC"] as const;

const getValidSemesters = (year: number): number[] => {
    const validSemesters = {
        1: [1, 2],
        2: [3, 4],
        3: [5, 6]
    };
    return validSemesters[year] || [];
};

const getMaxYear = (course: string): number => {
    return course === "MCA" ? 3 : 2;
};

const AddPaperPage: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [validSemesters, setValidSemesters] = useState<number[]>([1, 2]);

    const [formData, setFormData] = useState({
        course: "MCA" as "MCA" | "MSC",
        academicSession: "",
        year: 1,
        semester: 1,
        subject: "",
        teacher: "",
        examType: "Mid-Sem" as "Mid-Sem" | "End-Sem" | "Practical" | "Other",
        driveLink: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        fetchSubjectsAndTeachers();
    }, []);

    useEffect(() => {
        // Update valid semesters when year changes
        const semesters = getValidSemesters(formData.year);
        setValidSemesters(semesters);

        // If current semester is not valid for new year, reset to first valid semester
        if (!semesters.includes(formData.semester)) {
            setFormData(prev => ({...prev, semester: semesters[0]}));
        }
    }, [formData.year]);

    useEffect(() => {
        // When course changes, validate year and reset if needed
        const maxYear = getMaxYear(formData.course);
        if (formData.year > maxYear) {
            setFormData(prev => ({
                ...prev,
                year: maxYear,
                semester: getValidSemesters(maxYear)[0]
            }));
        }
    }, [formData.course]);

    const fetchSubjectsAndTeachers = async () => {
        const [subjectsData, teachersData] = await Promise.all([
            getAllSubjects(),
            getAllTeachers()
        ]);
        if (subjectsData) setSubjects(subjectsData);
        if (teachersData) setTeachers(teachersData);
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        const maxYear = getMaxYear(formData.course);

        if (!formData.academicSession) {
            newErrors.academicSession = "Academic session is required";
        } else if (!/^\d{4}-\d{2}$/.test(formData.academicSession)) {
            newErrors.academicSession = "Invalid format. Use YYYY-YY (e.g., 2024-25)";
        }

        if (formData.year < 1 || formData.year > maxYear) {
            newErrors.year = `Year must be between 1 and ${maxYear} for ${formData.course}`;
        }

        const validSems = getValidSemesters(formData.year);
        if (!validSems.includes(formData.semester)) {
            newErrors.semester = `For year ${formData.year}, semester must be ${validSems.join(" or ")}`;
        }

        if (!formData.subject) newErrors.subject = "Subject is required";
        if (!formData.teacher) newErrors.teacher = "Teacher is required";

        if (!formData.driveLink) {
            newErrors.driveLink = "Drive link is required";
        } else if (!/^https?:\/\/(drive\.google\.com\/file\/d\/[^\/]+\/view\?usp=sharing)$/.test(formData.driveLink)) {
            newErrors.driveLink = "Invalid Google Drive link format";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const response = await createPaperRequest({
            ...formData,
        });

        if (response) {
            setFormData({
                course: "MCA",
                academicSession: "",
                year: 1,
                semester: 1,
                subject: "",
                teacher: "",
                examType: "Mid-Sem",
                driveLink: "",
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ""}));
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
            <MouseEffectBackground/>
            <AnimatedWrapper>
                <div className="bg-neutral-900 text-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-center">Upload Question Paper</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Course Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Course</label>
                                <select
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    {COURSES.map(course => (
                                        <option key={course} value={course}>{course}</option>
                                    ))}
                                </select>
                                {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                            </div>

                            {/* Academic Session */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Academic Session</label>
                                <input
                                    type="text"
                                    name="academicSession"
                                    placeholder="e.g., 2024-25"
                                    value={formData.academicSession}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                {errors.academicSession &&
                                    <p className="text-red-500 text-sm mt-1">{errors.academicSession}</p>}
                            </div>

                            {/* Year */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Year</label>
                                <input
                                    type="number"
                                    name="year"
                                    min="1"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                            </div>

                            {/* Semester */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Semester</label>
                                <input
                                    type="number"
                                    name="semester"
                                    min="1"
                                    max="8"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                {errors.semester && <p className="text-red-500 text-sm mt-1">{errors.semester}</p>}
                            </div>

                            {/* Subject Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Subject</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="">Select Subject</option>
                                    {subjects
                                        .filter(subject => subject.course === formData.course)
                                        .map(subject => (
                                            <option key={subject._id} value={subject._id}>
                                                {subject.name} ({subject.subjectCode})
                                            </option>
                                        ))}
                                </select>
                                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                            </div>

                            {/* Teacher Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Teacher</label>
                                <select
                                    name="teacher"
                                    value={formData.teacher}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="">Select Teacher</option>
                                    {teachers.map(teacher => (
                                        <option key={teacher._id} value={teacher._id}>
                                            {teacher.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.teacher && <p className="text-red-500 text-sm mt-1">{errors.teacher}</p>}
                            </div>

                            {/* Exam Type */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Exam Type</label>
                                <select
                                    name="examType"
                                    value={formData.examType}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    {EXAM_TYPES.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                {errors.examType && <p className="text-red-500 text-sm mt-1">{errors.examType}</p>}
                            </div>

                            {/* Drive Link */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Google Drive Link</label>
                                <input
                                    type="url"
                                    name="driveLink"
                                    placeholder="https://drive.google.com/file/d/..."
                                    value={formData.driveLink}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                {errors.driveLink && <p className="text-red-500 text-sm mt-1">{errors.driveLink}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-4 rounded-lg transition mt-6"
                        >
                            Submit Paper Request
                        </button>
                    </form>
                </div>
            </AnimatedWrapper>
        </div>
    );
};

export default AddPaperPage;
