import {backend} from "../../AxiosRequests/backendRequestAxios";
import {toast} from "react-toastify";
import to from "await-to-js";
import {AxiosError} from "axios";

export interface Teacher {
    _id: string;
    name: string;
    email: string;
}

export const getAllTeachers = async () => {
    const toastId = toast.loading("Fetching teachers...");
    try {
        const [err, response] = await to(backend.get("/teacher/getAll"));
        if (err) {
            const error = err as AxiosError<{ message: string }>;
            const message = error.response?.data?.message || "Error fetching teachers";
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return null;
        }
        toast.update(toastId, {
            render: "Teachers loaded successfully",
            type: "success",
            isLoading: false,
            autoClose: 2000,
        });
        return response.data.data;
    } catch (err) {
        console.error("Unexpected error:", err);
        return null;
    }
};

export const addTeacher = async (name: string, email: string) => {
    const toastId = toast.loading("Adding teacher...");
    try {
        const [err, response] = await to(backend.post("/teacher/add", {
            name,
            email
        }));
        if (err) {
            const error = err as AxiosError<{ message: string }>;
            const message = error.response?.data?.message || "Error adding teacher";
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return null;
        }
        toast.update(toastId, {
            render: "Teacher added successfully",
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

export const removeTeacher = async (id: string) => {
    const toastId = toast.loading("Removing teacher...");
    try {
        const [err, response] = await to(backend.delete("/teacher/delete", {
            data: {teacherId: id}
        }));
        if (err) {
            const error = err as AxiosError<{ message: string }>;
            const message = error.response?.data?.message || "Error removing teacher";
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return null;
        }
        toast.update(toastId, {
            render: "Teacher removed successfully",
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
