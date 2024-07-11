import Image from "next/image";
import { createAvatar } from "@dicebear/core";
import { rings } from "@dicebear/collection";

interface AvatarProps {
	seed: string;
	className?: string;
}

const Avatar = ({ seed, className }: AvatarProps) => {
	const avatar = createAvatar(rings, {
		seed,
	});
	const dataUri = avatar.toDataUri();

	return (
		<Image
			src={dataUri}
			alt="user avatar"
			width={100}
			height={100}
			className={className}
		/>
	);
};

export default Avatar;
