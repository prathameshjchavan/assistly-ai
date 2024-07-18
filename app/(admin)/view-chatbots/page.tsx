import { GET_CHATBOTS_BY_USER } from "@/graphql/queries";
import { serverClient } from "@/lib/server/serverClient";
import {
	Chatbot,
	GetChatbotsByUserData,
	GetChatbotsByUserDataVariables,
} from "@/types/types";
import { auth } from "@clerk/nextjs/server";

const ViewChatbotsPage = async () => {
	const { userId } = await auth();

	if (!userId) return;

	// Get the chatbots for the user
	const {
		data: { chatbotsByUser },
	} = await serverClient.query<
		GetChatbotsByUserData,
		GetChatbotsByUserDataVariables
	>({
		query: GET_CHATBOTS_BY_USER,
		variables: {
			clerk_user_id: userId,
		},
	});

	const sortedChatbotsByUser: Chatbot[] = [...chatbotsByUser].sort(
		(a, b) =>
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	);

	return (
		<div className="flex-1 pb-20 p-10">
			<h1 className="text-xl lg:text-3xl font-semibold mb-5">
				Active Chatbots
			</h1>
		</div>
	);
};

export default ViewChatbotsPage;
