import React, { FC } from "react";
import { motion } from "framer-motion";

interface Props {
	pages: number[];
	currentPage: number;
	setPage: (page: number) => void;
}

const MiniNav: FC<Props> = ({ pages, currentPage, setPage }) => {
	return (
		<div className="flex justify-center items-center gap-x-4 sm:gap-x-3 w-[90%] mx-auto shrink-0">
			{pages.map((page) => (
				<React.Fragment key={page}>
					<div
						onClick={() => setPage(page)}
						className="flex items-center"
					>
						<button
							className={`rounded-full size-[40px] mx-auto font-DMSans self-start ${
								currentPage === page
									? "bg-black text-white"
									: "bg-[#EFF0F6] text-[#6F6C90]"
							} transition-colors duration-300`}
						>
							{page}
						</button>
					</div>
					{page !== pages.length && (
						<div className="relative max-w-[250px] w-full bg-[#EFF0F6] rounded-[40px] h-[6px]">
							<motion.div
								initial={{ width: "50%" }}
								animate={{
									width:
										page === currentPage
											? "50%"
											: page < currentPage
											? "100%"
											: "0%",
								}}
								className="bg-black rounded-[40px] h-full absolute"
							></motion.div>
						</div>
					)}
				</React.Fragment>
			))}
		</div>
	);
};

export default MiniNav;
