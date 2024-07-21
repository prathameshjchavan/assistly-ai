export const formatTimestamp = (date: Date) =>
	date.toLocaleString("en-IN", {
		month: "numeric",
		day: "2-digit",
		year: "numeric",
		minute: "2-digit",
		hour: "2-digit",
	});
