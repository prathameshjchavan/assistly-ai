"use client";

import { FormEvent, useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Message } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import startNewChat from "@/lib/startNewChat";

interface ChatbotPageProps {
	params: { id: string };
}

const ChatbotPage = ({ params: { id } }: ChatbotPageProps) => {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [chatId, setChatId] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const chatId = await startNewChat(name, email, Number(id));

		setChatId(chatId);
		setLoading(false);
		setIsOpen(false);
	};

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
		</div>
	);
};

export default ChatbotPage;
