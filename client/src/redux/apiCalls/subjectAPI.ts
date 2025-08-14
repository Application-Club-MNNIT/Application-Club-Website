import {backend} from "../../AxiosRequests/backendRequestAxios";
import {toast} from "react-toastify";
import to from "await-to-js";
import {AxiosError} from "axios";

export interface Subject {
    _id: string;
    name: string;
    subjectCode: string;
    course: "MCA" | "MSC";
}

export const getAllSubjects = async () => {
    const toastId = toast.loading("Fetching subjects...");
    try {
        const [err, response] = await to(backend.get("/subject/getAll"));
        if (err) {
            const error = err as AxiosError<{ message: string }>;
            const message = error.response?.data?.message || "Error fetching subjects";
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return null;
        }
        toast.update(toastId, {
            render: "Subjects loaded successfully",
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

export const addSubject = async (name: string, subjectCode: string, course: "MCA" | "MSC") => {
    const toastId = toast.loading("Adding subject...");
    try {
        const [err, response] = await to(backend.post("/subject/add", {
            name,
            subjectCode,
            course
        }));
        if (err) {
            const error = err as AxiosError<{ message: string }>;
            const message = error.response?.data?.message || "Error adding subject";
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return null;
        }
        toast.update(toastId, {
            render: "Subject added successfully",
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

export const removeSubject = async (id: string) => {
    const toastId = toast.loading("Removing subject...");
    try {
        const [err, response] = await to(backend.delete("/subject/delete", {
            data: {id}
        }));
        if (err) {
            const error = err as AxiosError<{ message: string }>;
            const message = error.response?.data?.message || "Error removing subject";
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return null;
        }
        toast.update(toastId, {
            render: "Subject removed successfully",
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
