export type Description = {
    en: string;
}

export type ReposUrl = {
    github: string[];
    bitbucket: any[];
}

export type Links = {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier?: any;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: ReposUrl;
}

export type Image = {
    thumb: string;
    small: string;
    large: string;
}

export type CurrencyValue = {
    [key: string]: number;
}

export type CurrencyDate = {
    [key: string]: Date;
}

export type MarketData = {
    current_price: CurrencyValue;
    total_value_locked?: any;
    mcap_to_tvl_ratio?: any;
    fdv_to_tvl_ratio?: any;
    roi?: any;
    ath: CurrencyValue;
    ath_change_percentage: CurrencyValue;
    ath_date: CurrencyDate;
    atl: CurrencyValue;
    atl_change_percentage: CurrencyValue;
    atl_date: CurrencyDate;
    market_cap: CurrencyValue;
    market_cap_rank: number;
    fully_diluted_valuation: CurrencyValue;
    total_volume: CurrencyValue;
    high_24h: CurrencyValue;
    low_24h: CurrencyValue;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: CurrencyValue;
    price_change_percentage_1h_in_currency: CurrencyValue;
    price_change_percentage_24h_in_currency: CurrencyValue;
    price_change_percentage_7d_in_currency: CurrencyValue;
    price_change_percentage_14d_in_currency: CurrencyValue;
    price_change_percentage_30d_in_currency: CurrencyValue;
    price_change_percentage_60d_in_currency: CurrencyValue;
    price_change_percentage_200d_in_currency: CurrencyValue;
    price_change_percentage_1y_in_currency: CurrencyValue;
    market_cap_change_24h_in_currency: CurrencyValue;
    market_cap_change_percentage_24h_in_currency: CurrencyValue;
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    last_updated: Date;
}

export type CommunityData = {
    facebook_likes?: any;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: number;
    telegram_channel_user_count?: any;
}

export type CodeAdditionsDeletions4Weeks = {
    additions: number;
    deletions: number;
}

export type DeveloperData = {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: CodeAdditionsDeletions4Weeks;
    commit_count_4_weeks: number;
    last_4_weeks_commit_activity_series: number[];
}

export type PublicInterestStats = {
    alexa_rank: number;
    bing_matches?: any;
}

export type Market = {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
}

export type ConvertValues = {
    btc: number;
    eth: number;
    usd: number;
}

export type Ticker = {
    base: string;
    target: string;
    market: Market;
    last: number;
    volume: number;
    converted_last: ConvertValues;
    converted_volume: ConvertValues;
    trust_score: string;
    bid_ask_spread_percentage: number;
    timestamp: Date;
    last_traded_at: Date;
    last_fetch_at: Date;
    is_anomaly: boolean;
    is_stale: boolean;
    trade_url: string;
    token_info_url?: any;
    coin_id: string;
    target_coin_id: string;
}

export type CoinData = {
    id: string;
    symbol: string;
    name: string;
    asset_platform_id?: any;
    block_time_in_minutes: number;
    hashing_algorithm: string;
    categories: string[];
    public_notice?: any;
    additional_notices: any[];
    description: Description;
    links: Links;
    image: Image;
    country_origin: string;
    genesis_date: string;
    sentiment_votes_up_percentage: number;
    sentiment_votes_down_percentage: number;
    market_cap_rank: number;
    coingecko_rank: number;
    coingecko_score: number;
    developer_score: number;
    community_score: number;
    liquidity_score: number;
    public_interest_score: number;
    market_data: MarketData;
    community_data: CommunityData;
    developer_data: DeveloperData;
    public_interest_stats: PublicInterestStats;
    status_updates: any[];
    last_updated: Date;
    tickers: Ticker[];
}
