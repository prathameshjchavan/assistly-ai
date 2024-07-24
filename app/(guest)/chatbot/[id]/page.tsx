"use client";

import { FormEvent, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	GetChatbotByIdResponse,
	GetChatbotByIdVariables,
	Message,
	MessagesByChatSessionIdResponse,
	MessagesByChatSessionIdVariables,
} from "@/types/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import startNewChat from "@/lib/startNewChat";
import Avatar from "@/components/Avatar";
import { useQuery } from "@apollo/client";
import {
	GET_CHATBOT_BY_ID,
	GET_MESSAGES_BY_CHAT_SESSION_ID,
} from "@/graphql/queries";
import Messages from "@/components/Messages";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

interface ChatbotPageProps {
	params: { id: string };
}

const formSchema = z.object({
	message: z.string().min(2, "Your message is too short!"),
});

const ChatbotPage = ({ params: { id } }: ChatbotPageProps) => {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [chatId, setChatId] = useState<number>(12);
	const [loading, setLoading] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const { data: chatbotData } = useQuery<
		GetChatbotByIdResponse,
		GetChatbotByIdVariables
	>(GET_CHATBOT_BY_ID, { variables: { id } });

	const {
		loading: loadingQuery,
		error,
		data,
	} = useQuery<
		MessagesByChatSessionIdResponse,
		MessagesByChatSessionIdVariables
	>(GET_MESSAGES_BY_CHAT_SESSION_ID, {
		variables: { chat_session_id: chatId },
		skip: !chatId,
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: "",
		},
	});

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const chatId = await startNewChat(name, email, Number(id));

		setChatId(chatId);
		setLoading(false);
		setIsOpen(false);
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);

		const { message: formMessage } = values;
		const message = formMessage;

		form.reset();

		if (!email || !name) {
			setIsOpen(true);
			setLoading(false);
			return;
		}

		if (!message.trim()) return;

		const userMessage: Message = {
			id: Date.now(),
			content: message,
			created_at: new Date().toISOString(),
			chat_session_id: chatId,
			sender: "user",
		};

		const loadingMessage: Message = {
			id: Date.now() + 1,
			content: "Thinking...",
			created_at: new Date().toISOString(),
			chat_session_id: chatId,
			sender: "ai",
		};

		setMessages((prevMessages) => [
			...prevMessages,
			userMessage,
			loadingMessage,
		]);
	}

	useEffect(() => {
		if (!data) return;

		setMessages(data.chat_sessions.messages);
	}, [data]);

	return (
		<div className="w-full flex bg-gray-100">
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<form onSubmit={handleSubmit}>
						<DialogHeader>
							<DialogTitle>Let help you out!</DialogTitle>
							<DialogDescription>
								I just need a few details to get started.
							</DialogDescription>
						</DialogHeader>

						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="John doe"
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="username" className="text-right">
									Email
								</Label>
								<Input
									id="username"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="john@appleseed.com"
									className="col-span-3"
								/>
							</div>
						</div>

						<DialogFooter>
							<Button type="submit" disabled={!name || !email || loading}>
								{!loading ? "Continue" : "Loading..."}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<div className="flex flex-col w-full max-w-3xl mx-auto bg-white md:rounded-t-lg shadow-2xl md:mt-10">
				<div className="pb-4 border-b sticky top-0 z-50 bg-[#4D7DFB] py-5 px-10 text-white md:rounded-t-lg flex items-center space-x-4">
					<Avatar
						seed={chatbotData?.chatbots.name!}
						className="h-12 w-12 bg-white rounded-full border-2 border-white"
					/>
					<div>
						<h1 className="truncate text-lg">{chatbotData?.chatbots.name}</h1>
						<p className="text-sm text-gray-300">
							⚡ Typically replies Instantly
						</p>
					</div>
				</div>

				<Messages
					messages={messages}
					chatbotName={chatbotData?.chatbots.name!}
				/>

				<Form {...form}>
					<form
						className="flex items-start sticky bottom-0 z-50 space-x-4 drop-shadow-lg p-4 bg-gray-100 rounded-md"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel hidden>Message</FormLabel>
									<FormControl>
										<Input
											placeholder="Type a message..."
											className="p-8"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="h-full"
							disabled={form.formState.isSubmitting || !form.formState.isValid}
						>
							Send
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default ChatbotPage;
