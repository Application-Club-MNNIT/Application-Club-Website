import React, {useEffect, useState} from "react";
import {MouseEffectBackground} from "../components/MouseEffectBackground";
import AnimatedWrapper from "../components/AnimatedWrapper";
import {getAllPaperRequests, Paper} from "../redux/apiCalls/paperAPI";
import {deletePaper, updatePaperStatus} from "../redux/apiCalls/adminPaperAPI";
import {format} from "date-fns";
import {FaCheck, FaTimes, FaTrash} from "react-icons/fa";

const AdminPapersPage: React.FC = () => {
    const [papers, setPapers] = useState<Paper[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCriteria, setFilterCriteria] = useState({
        course: "",
        examType: "",
        year: "",
        semester: "",
        status: "",
    });

    useEffect(() => {
        fetchPapers();
    }, []);

    const fetchPapers = async () => {
        const papersData = await getAllPaperRequests();
        if (papersData) {
            // Sort by createdAt in descending order (newest first)
            const sortedPapers = papersData.sort((a, b) =>
                new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
            );
            setPapers(sortedPapers);
        }
    };

    const handleUpdateStatus = async (paperId: string, newStatus: "approved" | "rejected") => {
        if (window.confirm(`Are you sure you want to mark this paper as ${newStatus}?`)) {
            const response = await updatePaperStatus(paperId, newStatus);
            if (response) {
                fetchPapers();
            }
        }
    };

    const handleDelete = async (paperId: string) => {
        if (window.confirm("Are you sure you want to delete this paper? This action cannot be undone.")) {
            const response = await deletePaper(paperId);
            if (response !== null) {
                fetchPapers();
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-500";
            case "rejected":
                return "bg-red-500";
            default:
                return "bg-yellow-500";
        }
    };

    const filteredPapers = papers.filter(paper => {
        const matchesSearch = (
            paper.subject?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paper.teacher?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            paper.academicSession.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const matchesCourse = !filterCriteria.course || paper.course === filterCriteria.course;
        const matchesExamType = !filterCriteria.examType || paper.examType === filterCriteria.examType;
        const matchesYear = !filterCriteria.year || paper.year.toString() === filterCriteria.year;
        const matchesSemester = !filterCriteria.semester || paper.semester.toString() === filterCriteria.semester;
        const matchesStatus = !filterCriteria.status || paper.status === filterCriteria.status;

        return matchesSearch && matchesCourse && matchesExamType && matchesYear && matchesSemester && matchesStatus;
    });

    const clearFilters = () => {
        setFilterCriteria({
            course: "",
            examType: "",
            year: "",
            semester: "",
            status: "",
        });
        setSearchTerm("");
    };

    return (
        <div className="relative min-h-screen p-6">
            <MouseEffectBackground/>
            <AnimatedWrapper>
                <div className="max-w-7xl mx-auto bg-neutral-900 rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Manage Papers</h2>
                        <span className="text-gray-400">
                            {filteredPapers.length} papers found
                        </span>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-6 gap-4">
                        <input
                            type="text"
                            placeholder="Search papers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 rounded bg-neutral-800 text-white border border-neutral-700 col-span-2"
                        />

                        <select
                            value={filterCriteria.course}
                            onChange={(e) => setFilterCriteria(prev => ({...prev, course: e.target.value}))}
                            className="p-2 rounded bg-neutral-800 text-white border border-neutral-700"
                        >
                            <option value="">All Courses</option>
                            <option value="MCA">MCA</option>
                            <option value="MSC">MSC</option>
                        </select>

                        <select
                            value={filterCriteria.examType}
                            onChange={(e) => setFilterCriteria(prev => ({...prev, examType: e.target.value}))}
                            className="p-2 rounded bg-neutral-800 text-white border border-neutral-700"
                        >
                            <option value="">All Exam Types</option>
                            <option value="Mid-Sem">Mid-Sem</option>
                            <option value="End-Sem">End-Sem</option>
                            <option value="Practical">Practical</option>
                            <option value="Other">Other</option>
                        </select>

                        <select
                            value={filterCriteria.status}
                            onChange={(e) => setFilterCriteria(prev => ({...prev, status: e.target.value}))}
                            className="p-2 rounded bg-neutral-800 text-white border border-neutral-700"
                        >
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <button
                            onClick={clearFilters}
                            className="p-2 rounded bg-teal-500 hover:bg-teal-600 text-white transition"
                        >
                            Clear Filters
                        </button>
                    </div>

                    {/* Papers List */}
                    <div className="space-y-4">
                        {filteredPapers.length === 0 ? (
                            <p className="text-gray-400 text-center py-8">No papers found.</p>
                        ) : (
                            filteredPapers.map((paper) => (
                                <div
                                    key={paper._id}
                                    className="bg-neutral-800 rounded-lg p-4 hover:bg-neutral-700 transition"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-2">
                                            <span className="px-2 py-1 text-xs rounded bg-teal-500 text-white">
                                                {paper.course}
                                            </span>
                                            <span
                                                className={`px-2 py-1 text-xs rounded ${getStatusColor(paper.status)} text-white`}>
                                                {paper.status}
                                            </span>
                                            <span className="px-2 py-1 text-xs rounded bg-blue-500 text-white">
                                                {paper.examType}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            {paper.status === "pending" && (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdateStatus(paper._id, "approved")}
                                                        className="p-2 rounded bg-green-500 hover:bg-green-600 text-white transition"
                                                        title="Approve"
                                                    >
                                                        <FaCheck/>
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(paper._id, "rejected")}
                                                        className="p-2 rounded bg-red-500 hover:bg-red-600 text-white transition"
                                                        title="Reject"
                                                    >
                                                        <FaTimes/>
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => handleDelete(paper._id)}
                                                className="p-2 rounded bg-red-500 hover:bg-red-600 text-white transition"
                                                title="Delete"
                                            >
                                                <FaTrash/>
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {paper.subject.name.toUpperCase()} ({paper.subject.subjectCode})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="text-sm text-gray-400 space-y-1">
                                            <p>Teacher: {paper.teacher.name}</p>
                                            <p>Year: {paper.year} | Semester: {paper.semester}</p>
                                            <p>Session: {paper.academicSession}</p>
                                        </div>
                                        <div className="text-sm text-gray-400 space-y-1">
                                            <p>Uploaded by: {paper.uploadedBy.email}</p>
                                            {paper.verifiedBy && (
                                                <p>Verified by: {paper.verifiedBy.email}</p>
                                            )}
                                            {paper.createdAt && (
                                                <p>
                                                    Uploaded: {format(new Date(paper.createdAt), 'MMM dd, yyyy HH:mm')}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <a
                                            href={paper.driveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block w-full text-center py-2 px-4 bg-neutral-700 hover:bg-neutral-600 text-white rounded transition"
                                        >
                                            View Paper
                                        </a>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </AnimatedWrapper>
        </div>
    );
};

export default AdminPapersPage;
