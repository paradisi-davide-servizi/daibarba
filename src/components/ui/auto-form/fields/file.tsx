import { AutoFormInputComponentProps } from "../types";
import AutoFormInput from "./input";

export default function AutoFormFile({
	fieldProps,
	...props
}: AutoFormInputComponentProps) {
	const { onChange: _onChange, fieldPropsWithoutOnChange } = fieldProps;
	return (
		<AutoFormInput
			fieldProps={{
				type: "file",
				...fieldPropsWithoutOnChange,
				onChange: (e: any) => props.field.onChange(e.target.files),
			}}
			{...props}
		/>
	);
}
