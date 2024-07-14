export async function POST(request: Request) {
	const { query, variables } = await request.json();

	try {
		if (query.trim().startsWith("mutation")) {
			// Handle mutation
		}
	} catch (error) {}
}
