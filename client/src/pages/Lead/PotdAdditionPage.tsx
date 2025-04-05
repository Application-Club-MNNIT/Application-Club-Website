import React, {useState} from "react";
import {backend} from "../../AxiosRequests/backendRequestAxios.js";
import {addPotd} from "../../redux/apiCalls/leadCalls.js";

interface Potd {
    date: string;
    questionLink: string;
}

const PotdAdditionPage: React.FC = () => {
    const [potd, setPotd] = useState<Potd>({
        date: "",
        questionLink: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setPotd((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(potd.date)
        console.log(new Date(potd.date))
        console.log(new Date(new Date(potd.date).setHours(0, 0, 0, 0)));

        const res = await addPotd(potd);
        if (res.status) setPotd({date: "", questionLink: ""});
    };

    return (
        <div
            className="p-4 mx-auto shadow-lg rounded-lg flex flex-col w-full max-w-[1400px]">
            <h2 className="text-xl font-bold mb-4">Add Problem of the Day</h2>
            <form onSubmit={handleSubmit} className="space-y-3 grid grid-cols-[1fr_3fr_1fr] gap-4 w-full">
                <input
                    type="date"
                    name="date"
                    value={potd.date}
                    onChange={handleChange}
                    className="border rounded"
                    required
                />
                <input
                    type="url"
                    name="questionLink"
                    value={potd.questionLink}
                    onChange={handleChange}
                    placeholder="Question Link"
                    className="border rounded"
                    required
                />
                <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
                    Add POTD
                </button>

            </form>
        </div>
    );
};

export default PotdAdditionPage;
