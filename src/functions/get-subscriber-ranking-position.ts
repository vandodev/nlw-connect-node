import { redis } from "../redis/client";

interface GetSubscriberRankingPositionParams {
	subscriberId: string;
}

export async function GetSubscriberRankingPosition({
	subscriberId,
}: GetSubscriberRankingPositionParams) {
	const rank = await redis.zrevrank("referral:ranking", subscriberId);

	if (rank === null) {
		return { position: null };
	}

	return { position: rank + 1 };
}
