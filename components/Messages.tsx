"use client";

import { usePathname } from "next/navigation";
import { UserCircle } from "lucide-react";

import { Message } from "@/types/types";
import Avatar from "./Avatar";
import { formatTimestamp } from "@/utils/formatTimestamp";

interface MessagesProps {
	messages: Message[];
	chatbotName: string;
}

const Messages = ({ messages, chatbotName }: MessagesProps) => {
	const path = usePathname();
	const isReviewPage = path.includes("review-sessions");

	return (
		<div>
			{messages.map((message) => {
				const isSender = message.sender !== "user";

				return (
					<div
						key={message.id}
						className={`chat ${isSender ? "chat-start" : "chat-end"} relative`}
					>
						{isReviewPage && (
							<p className="absolute -bottom-5 text-xs text-gray-300">
								Sent {formatTimestamp(new Date(message.created_at))}
							</p>
						)}

						<div
							className={`chat-image avatar w-10 ${!isSender ? "-mr-4" : ""}`}
						>
							{isSender ? (
								<Avatar
									seed={chatbotName}
									className="h-12 w-12 bg-white rounded-full border-2 border-[#2991EE]"
								/>
							) : (
								<UserCircle className="text-[#2991EE]" />
							)}
						</div>

						<p
							className={`chat-bubble text-white ${
								isSender ? "bg-[#4D7DFB]" : "bg-gray-200 text-gray-700"
							}`}
						>
							{message.content}
						</p>
					</div>
				);
			})}
		</div>
	);
};

export default Messages;
