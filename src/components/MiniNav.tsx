import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { FC } from "react";

interface Props {
	pages: { title: string }[];
	currentPage: number;
	setPage: (page: number) => void;
}

const MiniNav: FC<Props> = ({ pages, currentPage, setPage }) => {
	return (
		<header className="flex gap-x-9 sm:gap-x-5 lg:gap-x-8 items-center justify-between mb-8 sm:mb-12 w-fit mx-auto">
			{pages.map(({ title }, index) => (
				<>
					<button
						key={title}
						onClick={() => setPage(index)}
						className="text-sm lg:text-base font-semibold focus:outline-none flex items-center gap-x-2 w-fit"
					>
						<span
							className={cn(
								"size-10 md:size-8 justify-center items-center rounded-full bg-primary inline-flex shrink-0 text-white transition-colors duration-150",
								currentPage !== index &&
									"bg-white border-[1.5px] text-muted-foreground"
							)}
						>
							{index + 1}
						</span>
						<span
							className={cn(
								"text-primary tracking-wide transition-colors duration-150 text-start hidden sm:block",
								currentPage !== index && "text-muted-foreground"
							)}
						>
							{title}
						</span>
					</button>
					{index !== pages.length - 1 && (
						<ChevronRight
							key={title + index}
							className={cn(
								"hidden md:block",
								currentPage !== index
									? "stroke-muted-foreground"
									: "stroke-primary"
							)}
						/>
					)}
				</>
			))}
		</header>
	);
};

export default MiniNav;
