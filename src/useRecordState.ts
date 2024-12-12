import {
	useState, useCallback
} from "react";
import diff from "microdiff";

export default function useRecordState<T>(defaultValue: T) {
	const [value, _setValue] = useState(defaultValue);

	const setValue = useCallback(function (newValue: typeof value) {
		return _setValue(x => {
			if (
				typeof x !== "object" || x === null
				|| typeof newValue !== "object" || newValue === null
			)
				return x === newValue ? x : newValue;
			return diff(x, newValue).length === 0 ? x : newValue;
		});
	}, [_setValue]);

	return [value, setValue] as [typeof value, typeof setValue];
}
