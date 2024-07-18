import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { GET_CHATBOTS_BY_USER } from "@/graphql/queries";
import { serverClient } from "@/lib/server/serverClient";
import {
	Chatbot,
	GetChatbotsByUserData,
	GetChatbotsByUserDataVariables,
} from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

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

			{!sortedChatbotsByUser.length && (
				<div>
					<p>
						You have not created any chatbots yet, Click on the button below to
						create one.
					</p>
					<Link href="/create-chatbot">
						<Button className="bg-[#64B5F5] text-white p-3 rounded-md mt-5">
							Create Chatbot
						</Button>
					</Link>
				</div>
			)}

			<ul className="flex flex-col space-y-5">
				{sortedChatbotsByUser.map((chatbot) => (
					<Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
						<li className="relative p-10 border rounded-md max-w-3xl bg-white">
							<div>
								<div className="flex items-center space-x-4">
									<Avatar seed={chatbot.name} />
									<h2 className="text-xl font-bold">{chatbot.name}</h2>
								</div>

								<p className="absolute top-5 right-5 text-xs text-gray-400">
									Created: {new Date(chatbot.created_at).toLocaleString()}
								</p>
							</div>

							<hr className="mt-2" />

							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 md:gap-x-5 p-5">
								<h3 className="italic">Characteristics:</h3>

								<ul className="text-xs">
									{!chatbot.chatbot_characteristics.length && (
										<p>No characteristics added yet.</p>
									)}

									{chatbot.chatbot_characteristics.map((characteristic) => (
										<li
											className="list-disc break-words"
											key={characteristic.id}
										>
											{characteristic.content}
										</li>
									))}
								</ul>
							</div>
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default ViewChatbotsPage;
