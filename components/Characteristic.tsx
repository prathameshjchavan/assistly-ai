import { OctagonX } from "lucide-react";

import { ChatbotCharacteristic } from "@/types/types";

interface CharacteristicProps {
	characteristic: ChatbotCharacteristic;
}

const Characteristic = ({ characteristic }: CharacteristicProps) => {
	return (
		<li className="relative">
			{characteristic.content}
			<OctagonX className="w-6 h-6 text-black fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50" />
		</li>
	);
};

export default Characteristic;
