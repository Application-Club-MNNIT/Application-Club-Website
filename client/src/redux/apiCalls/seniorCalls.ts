// redux/apicalls/seniorCalls.ts
import { toast } from "react-toastify";
import to from "await-to-js";
import { backend } from "../../AxiosRequests/backendRequestAxios";

// Fetch all seniors
export const fetchAllSeniors = async (): Promise<{
  status: boolean;
  data?: any[];
  message?: string;
}> => {
  const id = toast.loading("Fetching seniors...");
  const [err, res]: any = await to(backend.get("/seniors", { withCredentials: true }));

  if (err) {
    const msg = err.response?.data?.message || err.message || "Failed to fetch seniors";
    toast.update(id, {
      render: msg,
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
    return { status: false, message: msg };
  }

  toast.update(id, {
    render: "Seniors fetched successfully",
    type: "success",
    isLoading: false,
    autoClose: 2000,
  });

  return { status: true, data: res.data.data };
};

// Follow or unfollow a senior
export const toggleFollowSenior = async (seniorId: string): Promise<{
  status: boolean;
  message: string;
}> => {
  const [err, res]: any = await to(
    backend.post(`/seniors/follow/${seniorId}`, { withCredentials: true })
  );

  if (err) {
    const msg = err.response?.data?.message || err.message || "Follow/unfollow failed";
    toast.error(msg);
    return { status: false, message: msg };
  }

  return { status: true, message: "Follow status updated!" };
};

// Fetch senior by ID
export const fetchSeniorById = async (
    seniorId: string
  ): Promise<{
    status: boolean;
    data?: any;
    message?: string;
  }> => {
    const id = toast.loading("Fetching senior details...");
    const [err, res]: any = await to(
      backend.get(`/seniors/${seniorId}`, { withCredentials: true })
    );
  
    if (err) {
      const msg = err.response?.data?.message || err.message || "Failed to fetch senior";
      toast.update(id, {
        render: msg,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return { status: false, message: msg };
    }
  
    toast.update(id, {
      render: "Senior details loaded",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
  
    return { status: true, data: res.data.data };
  };