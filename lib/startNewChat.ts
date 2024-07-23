import client from "@/graphql/apolloClient";
import {
	INSERT_CHAT_SESSION,
	INSERT_GUEST,
	INSERT_MESSAGE,
} from "@/graphql/mutations";
import {
	InsertChatSessionResponse,
	InsertChatSessionVariables,
	InsertGuestResponse,
	InsertGuestVariables,
	InsertMessageResponse,
	InsertMessageVariables,
} from "@/types/types";

async function startNewChat(
	guestName: string,
	guestEmail: string,
	chatbotId: number
): Promise<number> {
	try {
		// Create a new guest entry
		const guestResult = await client.mutate<
			InsertGuestResponse,
			InsertGuestVariables
		>({
			mutation: INSERT_GUEST,
			variables: {
				name: guestName,
				email: guestEmail,
				created_at: new Date(),
			},
		});

		const guestId = guestResult.data?.insertGuests.id;

		if (!guestId) throw new Error("Error creating guest");

		// Initialize a new chat session
		const chatSessionResult = await client.mutate<
			InsertChatSessionResponse,
			InsertChatSessionVariables
		>({
			mutation: INSERT_CHAT_SESSION,
			variables: {
				chatbot_id: chatbotId,
				guest_id: guestId,
				created_at: new Date(),
			},
		});

		const chatSessionId = chatSessionResult.data?.insertChat_sessions.id;

		if (!chatSessionId) throw new Error("Error creating chat session");

		// Insert initial message (optional)
		await client.mutate<InsertMessageResponse, InsertMessageVariables>({
			mutation: INSERT_MESSAGE,
			variables: {
				chat_session_id: chatSessionId,
				sender: "ai",
				content: `Welcome ${guestName}!\n How can I assist you today? 😊`,
				created_at: new Date(),
			},
		});

		console.log("New chat session started successfully");

		return chatSessionId;
	} catch (error) {
		console.error("Error starting new chat session: ", error);
		return 0;
	}
}

export default startNewChat;
