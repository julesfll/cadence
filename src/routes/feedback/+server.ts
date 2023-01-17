import { json } from '@sveltejs/kit';
import {
	GOOGLE_SHEET_ID,
	GOOGLE_CLIENT_EMAIL,
	GOOGLE_PROJECTID,
	GOOGLE_PRIVATE_KEY
} from '$env/static/private';
import * as sheets from '@googleapis/sheets';

const SHEET_RANGE = 'B2';
const SCOPES = [
	'https://www.googleapis.com/auth/drive',
	'https://www.googleapis.com/auth/drive.file',
	'https://www.googleapis.com/auth/spreadsheets'
];

// https://github.com/vercel/vercel/issues/749#issuecomment-715009494
async function getAuthToken() {
	const { privateKey } = JSON.parse(GOOGLE_PRIVATE_KEY || '{ privateKey: null }');
	const auth = new sheets.auth.GoogleAuth({
		scopes: SCOPES,
		projectId: GOOGLE_PROJECTID,
		credentials: {
			private_key: privateKey,
			client_email: GOOGLE_CLIENT_EMAIL
		}
	});
	const authClient = await auth.getClient();
	return authClient;
}

export async function POST({ request }) {
	const body = await request.json();

	const authClient = await getAuthToken();

	const client = sheets.sheets({
		version: 'v4',
		auth: authClient
	});

	const sheetsRes = await client.spreadsheets.values.append({
		spreadsheetId: GOOGLE_SHEET_ID,
		range: SHEET_RANGE,
		valueInputOption: 'USER_ENTERED',
		insertDataOption: 'INSERT_ROWS',
		requestBody: {
			values: [
				[
					Date.now(),
					body.email,
					body.category,
					body.sourceUrl,
					body.error,
					body.description,
					body.userAgent,
					body.reproduceSteps,
					body.expectedResult,
					body.actualResult
				]
			]
		}
	});

	return json(sheetsRes.data);
}
