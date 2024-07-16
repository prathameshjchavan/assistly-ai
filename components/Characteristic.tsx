"use client";

import { OctagonX } from "lucide-react";
import { ChatbotCharacteristic } from "@/types/types";
import { useMutation } from "@apollo/client";
import { REMOVE_CHARACTERISTIC } from "@/graphql/mutations";
import { GET_CHATBOT_BY_ID } from "@/graphql/queries";
import { toast } from "sonner";

interface CharacteristicProps {
	characteristic: ChatbotCharacteristic;
}

const Characteristic = ({ characteristic }: CharacteristicProps) => {
	const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC, {
		refetchQueries: ["GetChatbotById"],
	});

	const handleRemoveCharacteristic = async (characteristicId: number) => {
		try {
			await removeCharacteristic({ variables: { characteristicId } });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<li className="relative p-10 bg-white border rounded-md">
			{characteristic.content}
			<OctagonX
				onClick={() => {
					const promise = handleRemoveCharacteristic(characteristic.id);
					toast.promise(promise, {
						loading: "Removing...",
						success: "Characteristic removed",
						error: "Failed to remove characteristic",
					});
				}}
				className="w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50"
			/>
		</li>
	);
};

export default Characteristic;
