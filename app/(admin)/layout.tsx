import Header from "@/components/Header";
import { ReactNode } from "react";

interface AdminLayoutProps {
	children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
	return (
		<div>
			<Header />

			<div>
				{/* Sidebar */}
				<div>{children}</div>
			</div>
		</div>
	);
};

export default AdminLayout;
