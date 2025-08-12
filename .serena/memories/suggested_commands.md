# Suggested Commands

## Development Commands
```bash
# Change to project directory
cd sites/front_matome

# Install dependencies
npm install

# Start development server (normal mode)
npm start

# Start with mock data
npm run dev:mock

# Start without mock data
npm run dev:api

# Start on specific port with mock
npm run mock:8070

# Build for production
npm run build

# Run tests
npm test
```

## Mock Server Commands
```bash
# Start mock server
npm run server:start
# or
./start-mock-server.sh

# Stop mock server
npm run server:stop
# or
./stop-mock-server.sh
```

## Environment Variables
- `REACT_APP_USE_MOCK=true` - Use mock data
- `REACT_APP_API_URL` - API endpoint URL
- `PORT=8070` - Custom port for development

## Useful System Commands (macOS)
- `ls` - List files
- `cd` - Change directory
- `grep` - Search in files
- `find` - Find files/directories
- `git` - Version control

## Debug Mode
Add `?debug` to URL for debug interface
Add `?production=true` for production layout testing