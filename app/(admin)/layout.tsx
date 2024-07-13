import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

interface AdminLayoutProps {
	children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
	return (
		<div className="flex flex-col flex-1">
			<Header />

			<div className="flex flex-col md:flex-row bg-gray-100 flex-1">
				<Sidebar />

				<div className="flex flex-1 justify-center lg:justify-start items-start max-w-5xl mx-auto w-full">
					{children}
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
