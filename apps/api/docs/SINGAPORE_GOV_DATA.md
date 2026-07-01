# Singapore Government Data Integration

This project can fetch park data from Singapore's official government data portal (data.gov.sg) to provide comprehensive, up-to-date information about parks and recreation facilities.

## 🇸🇬 Why Use Government Data?

- **Comprehensive**: Access to 300+ parks across Singapore
- **Official**: Authoritative data from Singapore Land Authority (SLA) and NParks
- **Current**: Regularly updated with new parks and facilities
- **Free**: No API costs for reasonable usage limits
- **Accurate**: Official geographic and facility information

## 📋 Prerequisites

1. **Create data.gov.sg Account**
   - Visit: https://data.gov.sg/developer
   - Sign up for a free developer account
   - Get your API key from the developer portal

2. **Find Dataset IDs**
   - Browse: https://data.gov.sg/dataset
   - Search for: "parks", "recreation", "nparks", "nature reserves"
   - Note the dataset IDs for relevant datasets

## 🚀 Usage

### API Endpoint (Simple & Easy)

Fetch parks directly from the API:

```bash
# Test with top 6 parks
curl http://localhost:3000/api/parks/government?limit=6

# Fetch specific dataset
curl http://localhost:3000/api/parks/government?datasetId=YOUR_DATASET_ID&limit=20

# From frontend
fetch('/api/parks/government?limit=10')
```

### Response Format

```json
{
  "success": true,
  "source": "Singapore Government API (data.gov.sg)",
  "count": 6,
  "total": 300,
  "parks": [
    {
      "id": "gov-park-123",
      "name": "East Coast Park",
      "region": "East",
      "activities": ["Cycling", "Walking"],
      "amenities": ["Beach", "Playground"],
      "description": "Singapore's most popular park...",
      "signals": { "activity": 3, "family": 2 },
      "mrtStations": []
    }
  ],
  "timestamp": "2026-06-29T05:30:00Z"
}
```

## 📊 Available Datasets

Some relevant datasets on data.gov.sg:

### Parks & Recreation
- **NParks Parks Information**: Official park data from National Parks Board
- **Public Parks Facilities**: Detailed facilities and amenities
- **Nature Reserves**: Nature reserve boundaries and features
- **Park Connector Network**: PCN links and routes

### Related Data
- **MRT/LRT Stations**: Transit locations (we already use this)
- **Cycling Paths**: Park connector network
- **Weather Stations**: NEA weather sensors
- **Census Data**: Population demographics by area

## 🔧 How It Works

The fetcher uses Singapore's government API pattern:

1. **Poll Download Endpoint**
   ```javascript
   GET https://api-open.data.gov.sg/v1/public/api/datasets/{datasetId}/poll-download
   ```
   Returns a temporary download URL

2. **Fetch Dataset**
   ```javascript
   GET {downloadUrl}
   ```
   Returns the actual data (usually CSV format)

3. **Parse & Convert**
   - Parse CSV data
   - Convert to our Park format
   - Preserve existing MRT data
   - Apply limits and filters

## 📝 Data Structure

The fetcher converts government data to our format:

```typescript
{
  id: string,              // Generated unique ID
  name: string,            // Park name from government data
  region: string,          // Determined from planning area
  activities: string[],     // Extracted from facilities/features
  amenities: string[],     // Infrastructure and facilities
  description: string,     // Park description
  signals: ParkSignals,    // Activity strength indicators
  mrtStations: MRTStation[] // Preserved from existing data
}
```

## 🎯 Next Steps

1. **Create API Account**
   ```bash
   # Visit https://data.gov.sg/developer
   # Sign up and get your API key
   ```

2. **Test the Fetcher**
   ```bash
   npm run data:fetch:6
   ```

3. **Find Dataset IDs**
   - Browse https://data.gov.sg/dataset
   - Find parks/recreation datasets
   - Note the dataset IDs from URLs

4. **Full Import**
   ```bash
   npm run data:fetch -- --dataset-id YOUR_DATASET_ID
   ```

5. **Verify & Test**
   - Check parks.json content
   - Run dev server: npm run dev
   - Test recommendation flow
   - Verify all data displays correctly

## 🔒 Rate Limits & Best Practices

- **Free Tier**: 1,000 requests per day
- **Recommended**: Cache data locally (we use parks.json)
- **Strategy**: Fetch once, update periodically
- **Fallback**: Current hardcoded data always available

## 🆘 Troubleshooting

### "Failed to fetch poll-download data"
- Check internet connection
- Verify dataset ID is correct
- Ensure data.gov.sg API is accessible

### "Dataset not found"
- Dataset ID might be incorrect
- Check if dataset is still available on data.gov.sg
- Try browsing the dataset page directly

### "No parks found"
- Data format might be different than expected
- Check the actual data structure
- Update `parseGovParkData` function if needed

### "Rate limit exceeded"
- You've hit the daily API limit
- Wait until next day or upgrade to paid tier
- Use cached data in parks.json in the meantime

## 📚 Resources

- **data.gov.sg Developer Portal**: https://data.gov.sg/developer
- **API Documentation**: https://data.gov.sg/developer/guide/api
- **Available Datasets**: https://data.gov.sg/dataset
- **NParks Official**: https://www.nparks.gov.sg

## 🤝 Contributing

If you improve the government data fetcher or find new datasets:

1. Update `src/utils/govDataFetcher.ts`
2. Test with `npm run data:fetch:6`
3. Update this documentation
4. Share useful dataset IDs with the team

---

**Current Status**: ✅ Government data fetcher implemented
**Test Mode**: ✅ Works with top 6 parks
**Production**: ⏳ Waiting for API credentials
