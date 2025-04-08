import axios from "axios";
import githubUsernameRegex from "github-username-regex";

const githubToken = process.env.GITHUB_TOKEN;

const totalCommitsFetcher = async (username: string) => {
    if (!githubUsernameRegex.test(username)) {
        console.log("Invalid username provided.");
        throw new Error("Invalid username provided.");
    }

    const fetchTotalCommits = (variables: { login: string }, token: string) => {
        return axios({
            method: "get", url: `https://api.github.com/search/commits?q=author:${variables.login}`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/vnd.github.cloak-preview",
                Authorization: `token ${token}`,
            },
        });
    };

    let res: any;
    try {
        res = await fetchTotalCommits({ login: username }, githubToken);
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }

    const totalCount = res.data.total_count;
    if (!totalCount || isNaN(totalCount)) {
        throw new Error(
            "Could not fetch total commits.",
        );
    }
    return totalCount;
};

// test
const testTotalCommitsFetcher = async () => {
    try {
        const username = 'mahtosujeet';
        const totalCommits = await totalCommitsFetcher(username);
        console.log(`Total commits for ${username}: ${totalCommits}`);
    } catch (error) {
        console.error(error.message);
    }
};
// testTotalCommitsFetcher();

export { totalCommitsFetcher };
