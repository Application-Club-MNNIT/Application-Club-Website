import {backend} from "../../AxiosRequests/backendRequestAxios";
import {toast} from "react-toastify";
import to from "await-to-js";
import {AxiosError} from "axios";

export const updatePaperStatus = async (paperId: string, status: "pending" | "approved" | "rejected") => {
    const toastId = toast.loading("Updating paper status...");
    try {
        const [err, response] = await to(backend.put(`/paper/updatePaperRequest/${paperId}`, {status}));
        if (err) {
            const error = err as AxiosError<{ message: string }>;
            const message = error.response?.data?.message || "Error updating paper status";
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return null;
        }
        toast.update(toastId, {
            render: `Paper ${status} successfully`,
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

export const deletePaper = async (paperId: string) => {
    const toastId = toast.loading("Deleting paper...");
    try {
        const [err, response] = await to(backend.delete(`/paper/deletePaperRequest/${paperId}`));
        if (err) {
            const error = err as AxiosError<{ message: string }>;
            const message = error.response?.data?.message || "Error deleting paper";
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            return null;
        }
        toast.update(toastId, {
            render: "Paper deleted successfully",
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
