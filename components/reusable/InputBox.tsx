import React from "react";

type InputBoxType = {
	Icon?: (props: React.ComponentProps<"svg">) => JSX.Element;
	label: string;
	placeholder: string;
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	type: React.HTMLInputTypeAttribute;
	name: string;
	onIconClick?: () => void;
	textArea?: boolean;
};

const InputBox = (props: InputBoxType) => {
	const {
		Icon,
		label,
		placeholder,
		input,
		setInput,
		type,
		name,
		onIconClick,
		textArea = false,
	} = props;

	return (
		<div>
			<label
				htmlFor={label}
				className="text-sm font-medium text-gray-700 flex justify-between"
			>
				{label}
			</label>
			<div className="mt-1 relative rounded-md shadow-sm border">
				{textArea ? (
					<textarea
						rows={3}
						name={name}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="blockm min-h-[30px] text-left w-full pr-10 px-2 py-2 text-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm rounded-md"
						placeholder={placeholder}
					/>
				) : (
					<input
						type={type}
						name={name}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="block text-left w-full pr-10 px-2 py-2 text-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm rounded-md"
						placeholder={placeholder}
					/>
				)}
				{Icon && (
					<div
						onClick={() => onIconClick && onIconClick()}
						className="absolute z-20 cursor-pointer inset-y-0 right-0 pr-3 flex items-center"
					>
						<Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</div>
				)}
			</div>
			{/* <p className="mt-0.5 text-sm text-red-600" id="email-error">
				Your password must be less than 4 characters.
			</p> */}
		</div>
	);
};

export default InputBox;
