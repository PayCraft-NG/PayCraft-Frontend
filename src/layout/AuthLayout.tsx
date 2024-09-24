import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main className="h-[100dvh]">
			<nav className="fixed top-0 w-full bg-white">
				<div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f2f2f2] px-10 py-4">
					<div className="flex items-center gap-4 text-[#141414]">
						<div className="size-4">
							<img
								src="/paycraft.svg"
								className="object-cover"
							/>
						</div>
						<h2 className="text-[#1C160C] text-lg font-bold leading-tight tracking-[-0.015em]">
							PayCraft
						</h2>
					</div>
					<Button
						asChild
						className="px-5"
					>
						<Link to="/login">Login</Link>
					</Button>
				</div>
			</nav>
			<section className="pt-14">{children}</section>
		</main>
	);
};

export default AuthLayout;
