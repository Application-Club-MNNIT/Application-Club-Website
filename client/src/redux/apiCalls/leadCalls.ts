import {backend} from "../../AxiosRequests/backendRequestAxios.js";
import {toast} from "react-toastify";
import to from "await-to-js";

export const addPotd = async (body: any) => {
    const id = toast.loading("Adding Potd...");

    const [err, res]: [any, any] = await to(backend.post("/lead/addPotd", body))

    if (err) {
        const message = err.response?.data?.message || err.response?.data || err.message || "Some error occurred please try again later";
        toast.update(id, {
            render: message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
        });
        return {status: false, message};
    } else {
        toast.update(id, {
            render: "POTD added",
            type: "success",
            isLoading: false,
            autoClose: 2000,
        });
    }
    return {status: true, message: res.message || "Podd added successfully"};
}

export const getAllLeads = async () => {
    const response = await backend.get("/lead/getAllLeads");
    return response.data.leads;
}

export const getAllPotdsSubmissionData = async () => {
    const response = await backend.get("/lead/getAllPotdsSubmissionData");
    return response.data.potdSubmissionData
}

export const getSheetSubmissionData = async () => {
    const response = await backend.get(`/lead/getSheetSubmissionData`);
    return response.data.users;
};

export const getJuniorsData = async () => {
    const response = await backend.get(`/lead/getJuniorsData`);
    return response.data.users;
};