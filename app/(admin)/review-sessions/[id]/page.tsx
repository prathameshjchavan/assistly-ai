import { GET_CHAT_SESSION_MESSAGES } from "@/graphql/queries";
import { serverClient } from "@/lib/server/serverClient";
import {
	GetChatSessionMessagesResponse,
	GetChatSessionMessagesVariables,
} from "@/types/types";

export const dynamic = "force-dynamic";

interface ReviewSessionPageProps {
	params: {
		id: string;
	};
}

const ReviewSessionPage = async ({
	params: { id },
}: ReviewSessionPageProps) => {
	const {
		data: {
			chat_sessions: {
				id: chatSessionId,
				created_at,
				messages,
				chatbots: { name },
				guests: { name: guestName, email },
			},
		},
	} = await serverClient.query<
		GetChatSessionMessagesResponse,
		GetChatSessionMessagesVariables
	>({
		query: GET_CHAT_SESSION_MESSAGES,
		variables: { id: parseInt(id) },
	});

	return <div>ReviewSessionPage</div>;
};

export default ReviewSessionPage;
