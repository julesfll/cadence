//stackoverflow.com/questions/11731072/dividing-an-array-by-filter-function
export function partition<T>(array: T[], filter: (elem: T) => boolean): [T[], T[]] {
	const pass: T[] = [],
		fail: T[] = [];
	array.forEach((elem) => (filter(elem) ? pass : fail).push(elem));
	return [pass, fail];
}
