export function generateLink(slug: string, questionId: string, platform: string): string {

    if (!slug || !questionId) {
        console.log(slug + " " + questionId + " " + platform);
        return 'NA';
    }

    switch (platform) {
        case "leetcode":
            return `https://leetcode.com/problems/${slug}/description/`;
        case "codeforces":
            return `https://codeforces.com/contest/${questionId.split(" ")[0]}/problem/${questionId.split(" ")[1]}`;
        case "gfg":
            return `https://www.geeksforgeeks.org/problems/${slug}/1`;
    }

    return "";
}