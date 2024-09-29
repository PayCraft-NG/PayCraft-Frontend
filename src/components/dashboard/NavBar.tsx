import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const NavBar = () => {
	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 bg-white z-50">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
				<Link
					to="/dashboard"
					className="flex items-center gap-4 text-[#141414]"
				>
					<div className="size-4">
						<img
							src="/paycraft.svg"
							className="object-cover"
						/>
					</div>
					<h2 className="text-[#1C160C] text-lg font-bold leading-tight tracking-[-0.015em]">
						PayCraft
					</h2>
				</Link>
				<Link
					to="/dashboard"
					className="text-foreground transition-colors hover:text-foreground"
				>
					Dashboard
				</Link>
				<Link
					to="/dashboard/profile"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Profile
				</Link>
				<Link
					to="/dashboard/employee"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Employees
				</Link>
				<Link
					to="/dashboard/payroll"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Payroll
				</Link>
				<Link
					to="#"
					className="text-muted-foreground transition-colors hover:text-foreground"
				>
					Analytics
				</Link>
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className="shrink-0 md:hidden"
					>
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-medium">
						<Link
							to="/dashboard"
							className="flex items-center gap-4 text-[#141414]"
						>
							<div className="size-4">
								<img
									src="/paycraft.svg"
									className="object-cover"
								/>
							</div>
							<h2 className="text-[#1C160C] text-lg font-bold leading-tight tracking-[-0.015em]">
								PayCraft
							</h2>
						</Link>
						<Link
							to="/dashboard"
							className="hover:text-foreground"
						>
							Dashboard
						</Link>
						<Link
							to="/dashboard/profile"
							className="text-muted-foreground hover:text-foreground"
						>
							Profile
						</Link>
						<Link
							to="/dashboard/employee"
							className="text-muted-foreground hover:text-foreground"
						>
							Employees
						</Link>
						<Link
							to="/dashboard/payroll"
							className="text-muted-foreground hover:text-foreground"
						>
							Payroll
						</Link>
						<Link
							to="#"
							className="text-muted-foreground hover:text-foreground"
						>
							Analytics
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<form className="ml-auto flex-1 sm:flex-initial">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search..."
							className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						/>
					</div>
				</form>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="secondary"
							size="icon"
							className="rounded-full"
						>
							<CircleUser className="h-5 w-5" />
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Support</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};

export default NavBar;
