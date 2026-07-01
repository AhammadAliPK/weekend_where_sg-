/**
 * Singapore Government Data Fetcher
 * Fetches park data from data.gov.sg API
 *
 * API Documentation: https://data.gov.sg/developer
 * Parks Dataset: Singapore Parks and Recreation Data
 */

interface GovDataAPIResponse {
	code: number;
	errMsg?: string;
	data: {
		url: string;
		expiryTime: number;
	};
}

interface GovParkRecord {
	// Add actual government data structure fields when we know them
	[name: string]: any;
}

/**
 * Fetch park data from Singapore government API
 * Uses the poll-download pattern required by data.gov.sg
 */
export async function fetchParksFromGovAPI(datasetId?: string): Promise<any[]> {
	// Default parks dataset - replace with actual dataset ID when found
	const defaultDatasetId = datasetId || "d_77d7ec97be83d44f61b85454f844382f";
	const apiUrl = `https://api-open.data.gov.sg/v1/public/api/datasets/${defaultDatasetId}/poll-download`;

	try {
		console.log(`🇸🇬 Fetching data from Singapore government API...`);

		// Step 1: Get download URL
		const pollResponse = await fetch(apiUrl);
		if (!pollResponse.ok) {
			throw new Error(`Failed to fetch poll-download data: ${pollResponse.status}`);
		}

		const pollData: GovDataAPIResponse = await pollResponse.json();
		if (pollData.code !== 0) {
			throw new Error(`Government API error: ${pollData.errMsg || 'Unknown error'}`);
		}

		const downloadUrl = pollData.data.url;
		console.log(`✅ Got download URL, expiry: ${pollData.data.expiryTime ? new Date(pollData.data.expiryTime).toISOString() : 'unknown'}`);

		// Step 2: Fetch actual data
		const dataResponse = await fetch(downloadUrl);
		if (!dataResponse.ok) {
			throw new Error(`Failed to fetch dataset: ${dataResponse.status}`);
		}

		const rawData = await dataResponse.text();
		console.log(`📊 Fetched ${rawData.length} bytes of data`);

		// Step 3: Parse the data (assuming CSV format)
		return parseGovParkData(rawData);
	} catch (error) {
		console.error('❌ Error fetching government data:', error);
		throw error;
	}
}

/**
 * Parse government park data and convert to our format
 * This function will be adapted based on the actual data structure
 */
function parseGovParkData(rawData: string): any[] {
	console.log('🔄 Parsing government park data...');

	// Parse CSV data (assuming format, adjust as needed)
	const lines = rawData.split('\n');
	const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

	const parks: any[] = [];

	// Skip header, process remaining rows (limit to 6 as requested)
	for (let i = 1; i < Math.min(lines.length, 7); i++) {
		if (!lines[i].trim()) continue;

		const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
		const record: any = {};

		headers.forEach((header, index) => {
			record[header] = values[index] || '';
		});

		// Convert to our park format
		parks.push(convertGovRecordToPark(record));
	}

	console.log(`✅ Parsed ${parks.length} parks from government data`);
	return parks;
}

/**
 * Convert government record to our Park format
 * This will be adapted based on actual data structure
 */
function convertGovRecordToPark(record: GovParkRecord): any {
	// Placeholder conversion - update based on actual data structure
	// This assumes the government data has fields like: name, region, description, etc.

	return {
		id: `gov-park-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
		name: record.name || record.park_name || 'Unknown Park',
		region: record.region || determineRegionFrom(record),
		activities: extractActivities(record),
		amenities: extractAmenities(record),
		description: record.description || record.park_description || 'Park from Singapore government data',
		signals: generateSignals(record),
		mrtStations: [] // Will be added separately
	};
}

/**
 * Determine region from government record
 */
function determineRegionFrom(record: GovParkRecord): string {
	// Try to determine region from various fields
	const regionFields = ['region', 'planning_area', 'planning_region'];

	for (const field of regionFields) {
		if (record[field]) {
			const value = record[field].toLowerCase();
			if (value.includes('central')) return 'Central';
			if (value.includes('east')) return 'East';
			if (value.includes('west')) return 'West';
			if (value.includes('north')) return 'North';
			if (value.includes('south')) return 'South';
		}
	}

	return 'Central'; // Default
}

/**
 * Extract activities from government record
 */
function extractActivities(record: GovParkRecord): string[] {
	const activities: string[] = [];
	const activityFields = [
		'activities', 'facilities', 'features', 'amenities'
	];

	for (const field of activityFields) {
		if (record[field]) {
			const value = String(record[field]).toLowerCase();
			if (value.includes('cycle')) activities.push('Cycling');
			if (value.includes('walk') || value.includes('jog')) activities.push('Walking');
			if (value.includes('nature') || value.includes('forest')) activities.push('Nature');
			if (value.includes('playground') || value.includes('family')) activities.push('Family outing');
			if (value.includes('fitness') || value.includes('exercise')) activities.push('Fitness');
		}
	}

	// Default if no activities found
	return activities.length > 0 ? activities : ['Walking', 'Nature'];
}

/**
 * Extract amenities from government record
 */
function extractAmenities(record: GovParkRecord): string[] {
	const amenities: string[] = [];
	const amenityFields = [
		'facilities', 'features', 'amenities', 'infrastructure'
	];

	for (const field of amenityFields) {
		if (record[field]) {
			const value = String(record[field]);
			// Split by common delimiters and clean up
			const items = value.split(/[,;\/]/).map(item => item.trim()).filter(Boolean);
			amenities.push(...items.slice(0, 5)); // Limit to 5 amenities
		}
	}

	// Default if no amenities found
	return amenities.length > 0 ? amenities : ['Parking', 'Walking paths'];
}

/**
 * Generate activity signals based on record
 */
function generateSignals(record: GovParkRecord): any {
	const signals = {
		activity: 2,
		family: 2,
		cycling: 1,
		nature: 2,
		fitness: 1,
		route: 2,
		kidFriendly: 1
	};

	// Enhance based on available data
	const activities = extractActivities(record);
	if (activities.includes('Cycling')) signals.cycling = 3;
	if (activities.includes('Family outing')) {
		signals.family = 3;
		signals.kidFriendly = 2;
	}
	if (activities.includes('Nature')) signals.nature = 3;
	if (activities.includes('Fitness')) signals.fitness = 2;

	return signals;
}

/**
 * Sample function - lists available datasets
 * Call this to explore what park datasets are available
 */
export async function exploreAvailableDatasets(): Promise<string[]> {
	// This would query the data.gov.sg API for available park-related datasets
	// For now, return some known dataset IDs to try
	return [
		'Singapore Parks and Recreation',
		'NParks Parks Information',
		'Public Parks Facilities',
		'Nature Reserves Data'
	];
}

/**
 * Test function to fetch a limited number of parks (as requested: top 6)
 */
export async function fetchTopParksForTesting(): Promise<any[]> {
	console.log('🧪 Testing government API with top 6 parks...');
	try {
		const parks = await fetchParksFromGovAPI();
		console.log(`📝 Successfully fetched ${parks.length} parks for testing`);
		return parks.slice(0, 6);
	} catch (error) {
		console.error('❌ Test fetch failed:', error);
		throw error;
	}
}
