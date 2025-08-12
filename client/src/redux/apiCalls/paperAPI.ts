import {backend} from "../../AxiosRequests/backendRequestAxios";
import {toast} from "react-toastify";
import to from "await-to-js";
import {AxiosError} from "axios";

export interface Paper {
    _id: string;
    course: "MCA" | "MSC";
    subject: {
        _id: string;
        name: string;
        subjectCode: string;
    };
    academicSession: string;
    year: number;
    semester: number;
    teacher: {
        _id: string;
        name: string;
        email: string;
    };
    examType: "Mid-Sem" | "End-Sem" | "Practical" | "Other";
    driveLink: string;
    status: "pending" | "approved" | "rejected";
    uploadedBy: {
        _id: string;
        name: string;
        email: string;
    };
    verifiedBy?: {
        _id: string;
        name: string;
        email: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export const createPaperRequest = async (paperData: {
    course: string;
    academicSession: string;
    year: number;
    semester: number;
    subject: string;
    teacher: string;
    examType: string;
    driveLink: string
}) => {
    const toastId = toast.loading("Creating paper request...");
    try {
        const [err, response] = await to(backend.post("/paper/uploadPaper", paperData));
        if (err) {
            const error = err as AxiosError<{ message: string }>;
            const message = error.response?.data?.message || "Error creating paper request";
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return null;
        }
        toast.update(toastId, {
            render: "Paper request created successfully",
            type: "success",
            isLoading: false,
            autoClose: 2000,
        });
        return response.data;
    } catch (err) {
        console.error("Unexpected error:", err);
        return null;
    }
};

export const getAllPaperRequests = async () => {
    const toastId = toast.loading("Fetching papers...");
    try {
        const [err, response] = await to(backend.get("/paper/getAllPaperRequests"));
        if (err) {
            const error = err as AxiosError<{ message: string }>;
            const message = error.response?.data?.message || "Error fetching papers";
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return null;
        }
        toast.update(toastId, {
            render: "Papers loaded successfully",
            type: "success",
            isLoading: false,
            autoClose: 2000,
        });
        return response.data.data.requests;
    } catch (err) {
        console.error("Unexpected error:", err);
        return null;
    }
};
