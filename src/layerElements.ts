export default function layerElements(decorators?: ((_child: JSX.Element) => JSX.Element)[]) {
	const firstElement = (() => {
		const firstDecorator = decorators?.[decorators.length - 1];
		if (firstDecorator === undefined) return null;
		// @ts-expect-error First decorator's child is null, but we won't specify so in type annotation to save you from null check hell.
		return firstDecorator(null);
	})();
	if (firstElement === null) return null;
	let accumulatedElement: JSX.Element = firstElement;
	for (const x of (decorators?.reverse()?.slice(1) || [])) {
		accumulatedElement = x(accumulatedElement);
	}
	return accumulatedElement;
}

