import React from "react";

const Loading = ({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) => {
	return (
		<>
			{isLoading ? (
				<div className="flex justify-center items-center w-scree h-screen p-4">
					<div
						style={{ borderTopColor: "transparent" }}
						className=" w-10 h-10 border-4 border-red-500 border-solid rounded-full animate-spin"
					></div>
				</div>
			) : (
				children
			)}
		</>
	);
};

export default Loading;
