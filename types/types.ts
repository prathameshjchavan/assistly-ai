export interface Chatbot {
	id: number;
	clerk_user_id: string;
	name: string;
	created_at: string;
	chatbot_characteristics: ChatbotCharacteristic[];
	chat_sessions: ChatSession[];
}

export interface ChatbotCharacteristic {
	id: number;
	chatbot_id: number;
	content: string;
	created_at: string;
}

export interface Guest {
	id: number;
	name: string;
	email: string;
	created_at: string;
}

export interface ChatSession {
	id: number;
	chatbot_id: number;
	guest_id: number | null;
	created_at: string;
	messages: Message[];
	guests: Guest;
}

export interface Message {
	id: number;
	chat_session_id: number;
	content: string;
	created_at: string;
	sender: "ai" | "user";
}

export interface GetChatbotByIdResponse {
	chatbots: Chatbot;
}

export interface GetChatbotByIdVariables {
	id: string;
}

export interface GetChatbotsByUserData {
	chatbotsByUser: Chatbot[];
}

export interface GetChatbotsByUserDataVariables {
	clerk_user_id: string;
}

export interface GetUserChatbotsResponse {
	chatbotsByUser: Chatbot[];
}

export interface GetUserChatbotsVariables {
	userId: string;
}

export interface GetChatSessionMessagesResponse {
	chat_sessions: {
		id: number;
		created_at: string;
		messages: Message[];
		chatbots: {
			name: string;
		};
		guests: {
			name: string;
			email: string;
		};
	};
}

export interface GetChatSessionMessagesVariables {
	id: number;
}

export interface InsertGuestResponse {
	insertGuests: {
		id: number;
	};
}

export interface InsertGuestVariables {
	name: string;
	email: string;
	created_at: Date;
}

export interface InsertChatSessionResponse {
	insertChat_sessions: {
		id: number;
	};
}

export interface InsertChatSessionVariables {
	chatbot_id: number;
	guest_id: number;
	created_at: Date;
}

export interface InsertMessageResponse {
	insertMessages: {
		id: number;
		content: string;
		created_at: Date;
		sender: string;
	};
}

export interface InsertMessageVariables {
	chat_session_id: number;
	content: string;
	sender: string;
	created_at: Date;
}

export interface MessagesByChatSessionIdResponse {
	chat_sessions: {
		id: number;
		messages: Message[]
	};
}

export interface MessagesByChatSessionIdVariables {
	chat_session_id: number;
}
