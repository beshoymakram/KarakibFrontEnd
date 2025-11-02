@echo off
echo 🧪 Testing Chatbot Server Endpoints
echo.
echo Make sure your chatbot server is running on port 3001!
echo.
pause

echo.
echo 1️⃣ Testing Health Endpoint...
curl http://localhost:3001/api/health
echo.
echo.

echo 2️⃣ Testing Context Retrieval with sample questions...
echo.
echo Query: "How do I collect waste?"
curl "http://localhost:3001/api/test-context?q=How%20do%20I%20collect%20waste?"
echo.
echo.

echo Query: "What types of waste do you accept?"
curl "http://localhost:3001/api/test-context?q=What%20types%20of%20waste%20do%20you%20accept?"
echo.
echo.

echo ✅ Testing Complete!
echo.
pause

