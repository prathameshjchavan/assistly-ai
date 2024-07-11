import Link from "next/link";
import Avatar from "./Avatar";

const Header = () => {
	return (
		<header>
			<Link href="/">
				<Avatar seed="PAPAFAM Support Agent" />

				<div>
					<h1>Assistly</h1>
					<h2 className="text-sm">Your customizable AI Chat Agent</h2>
				</div>
			</Link>
		</header>
	);
};

export default Header;
