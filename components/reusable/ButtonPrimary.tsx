import * as React from "react";
import { classNames } from "../../utils";

interface ButtonPrimaryProps {
	size: "xsmall" | "small" | "medium" | "large";
	type?: "button" | "submit" | "reset";
	text: string;
	onClick?: () => void;
	disabled?: boolean;
	isLoading?: boolean;
	Icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
	customStyle?: React.CSSProperties;
}

const ButtonPrimary = (props: ButtonPrimaryProps) => {
	const {
		size,
		Icon,
		text,
		onClick,
		disabled = false,
		isLoading = false,
		customStyle,
		type,
	} = props;
	return (
		<button
			type={type}
			onClick={onClick}
			style={customStyle}
			disabled={disabled || isLoading}
			className={classNames(
				size === "xsmall"
					? "py-0.5 px-1.5 min-w-min w-18"
					: size === "small"
					? "py-1.5 px-2 min-w-min w-24"
					: size === "medium"
					? "py-2.5 px-2.5 w-40"
					: "w-full px-3 py-3",
				disabled || isLoading ? "opacity-30" : "hover:bg-red-600",
				"inline-flex rounded-md items-center flex-shrink-0 whitespace-nowrap justify-center border border-transparent font-medium shadow-sm text-white bg-red-500 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
			)}
		>
			{isLoading ? (
				<div className={"w-full flex justify-center items-center"}>
					<div
						style={{ borderTopColor: "transparent" }}
						className="w-5 ml-1 h-5 border-4 border-darkblue-300 border-solid rounded-full animate-spin"
					></div>
				</div>
			) : (
				<div className="flex gap-1 items-center">
					{text}
					{Icon && <Icon className="h-6 w-6 mr-1" />}
				</div>
			)}
		</button>
	);
};

export default ButtonPrimary;
