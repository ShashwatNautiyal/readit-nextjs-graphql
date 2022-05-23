import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { HiSelector } from "react-icons/hi";
import { Combobox } from "@headlessui/react";
import { classNames } from "../../utils";

type DropdownProps = {
	label: string;
	selected:
		| {
				value: string;
				imgUrl?: string;
		  }
		| undefined;
	setSelected: React.Dispatch<
		React.SetStateAction<
			| {
					value: string;
					imgUrl?: string | undefined;
			  }
			| undefined
		>
	>;
	options: {
		value: string;
		imgUrl?: string;
	}[];
	isCustomValue?: boolean;
};

export default function DropdownProps({
	label,
	selected,
	setSelected,
	options,
	isCustomValue,
}: DropdownProps) {
	const [query, setQuery] = useState("");

	const filteredOptions =
		query === ""
			? options
			: options.filter((item) => {
					return item.value.toLowerCase().includes(query.toLowerCase());
			  });

	return (
		<Combobox as="div" className={"w-full"} value={selected} onChange={setSelected}>
			<Combobox.Label className="block text-sm font-medium text-gray-700">
				{label}
			</Combobox.Label>
			<div className="relative mt-1">
				<Combobox.Input
					className="w-full rounded-md border bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
					onChange={(event) => setQuery(event.target.value)}
					displayValue={(option: typeof options[0]) => option?.value}
				/>
				<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
					<HiSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
				</Combobox.Button>

				<Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
					{filteredOptions.length > 0
						? filteredOptions.map((option) => (
								<Combobox.Option
									key={option.value}
									value={option}
									className={({ active }) =>
										classNames(
											"relative cursor-default select-none py-2 pl-3 pr-9",
											active ? "bg-indigo-600 text-white" : "text-gray-900"
										)
									}
								>
									{({ active, selected }) => (
										<>
											<div className="flex items-center">
												{option.imgUrl && (
													<img
														src={option.imgUrl}
														alt=""
														className="h-6 w-6 flex-shrink-0 rounded-full"
													/>
												)}
												<span
													className={classNames(
														"ml-3 truncate",
														selected ? "font-semibold" : ""
													)}
												>
													{option.value}
												</span>
											</div>

											{selected && (
												<span
													className={classNames(
														"absolute inset-y-0 right-0 flex items-center pr-4",
														active ? "text-white" : "text-indigo-600"
													)}
												>
													<FiCheck
														className="h-5 w-5"
														aria-hidden="true"
													/>
												</span>
											)}
										</>
									)}
								</Combobox.Option>
						  ))
						: query.length > 0 &&
						  isCustomValue && (
								<Combobox.Option
									className={classNames(
										"relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
									)}
									value={{ value: query }}
								>
									{query}
								</Combobox.Option>
						  )}
				</Combobox.Options>
			</div>
		</Combobox>
	);
}
