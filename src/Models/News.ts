import { getNewsData } from "../api/apiRequest";
import { NewsData } from "../api/apiRequestTypes";

export default class News {
    public newsFromApi: NewsData | undefined;

    constructor() {
        this.newsFromApi = undefined;
    }

    async apiReqNews(): Promise<NewsData> {
        this.newsFromApi = await getNewsData();
        return this.newsFromApi
    }
}
