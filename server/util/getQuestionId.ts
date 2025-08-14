import axios from "axios";

export async function getQuestionId(questionLink: string): Promise<[string, string, string] | null> {

    let platform: string;
    if (questionLink.includes("geeksforgeeks")) platform = "gfg";
    else if (questionLink.includes("leetcode.com")) platform = "leetcode";
    else return null;

    let questionId: string;
    let slug: string;
    if (platform == "gfg") [questionId, slug] = await getGfgQuesionId(questionLink);
    else if (platform == "leetcode") [questionId, slug] = await getLeetcodeQuestionId(questionLink);
    else return null;

    return [questionId, platform, slug];
}

async function getGfgQuesionId(questionLink: string): Promise<[string, string]> {
    const questionSlug = questionLink.split("/problems/")[1].split("/")[0];
    const apiUrl = `https://practiceapi.geeksforgeeks.org/api/latest/problems/${questionSlug}/metainfo/?`;
    const response = await axios.get(apiUrl);
    return ["G" + response.data?.results?.id, questionSlug];
}

async function getLeetcodeQuestionId(questionLink: string): Promise<[string, string]> {
    const slug = questionLink.split("/problems/")[1].replace(/\//g, "").trim();
    const GRAPHQL_ENDPOINT = "https://leetcode.com/graphql"; // Replace with the actual endpoint if different

    const query = `
        query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
          problemsetQuestionList: questionList(
            categorySlug: $categorySlug
            limit: $limit
            skip: $skip
            filters: $filters
          ) {
            questions: data {
              id: questionId
            }
          }
        }
    `;

    const variables = {
        categorySlug: "all-code-essentials",
        skip: 0,
        limit: 1,
        filters: {
            searchKeywords: slug,
        },
    };

    const response = await axios.post(GRAPHQL_ENDPOINT, {query, variables}, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return ["L" + response.data.data.problemsetQuestionList.questions[0].id, slug];
}
