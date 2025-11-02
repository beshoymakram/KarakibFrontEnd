# Test Script for Chatbot Server Endpoints
# Run this after starting your chatbot server

Write-Host "🧪 Testing Chatbot Server Endpoints" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "1️⃣ Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-WebRequest -Uri "http://localhost:3001/api/health" -Method GET
    $healthData = $healthResponse.Content | ConvertFrom-Json
    
    Write-Host "✅ Health Check Successful!" -ForegroundColor Green
    Write-Host "   Status: $($healthData.status)"
    Write-Host "   Knowledge Base Loaded: $($healthData.knowledge_base_loaded)"
    Write-Host "   Knowledge Base Path: $($healthData.knowledge_base_path)"
    if ($healthData.knowledge_base_stats) {
        Write-Host "   Waste Types: $($healthData.knowledge_base_stats.waste_types)"
        Write-Host "   FAQ Categories: $($healthData.knowledge_base_stats.faq_categories)"
        Write-Host "   Total FAQ Questions: $($healthData.knowledge_base_stats.total_faq_questions)"
        Write-Host "   Company: $($healthData.knowledge_base_stats.company_name)"
    }
} catch {
    Write-Host "❌ Health Check Failed!" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)"
    Write-Host "   Make sure your chatbot server is running on port 3001"
}

Write-Host ""

# Test 2: Context Retrieval
Write-Host "2️⃣ Testing Context Retrieval..." -ForegroundColor Yellow
$testQueries = @(
    "How do I collect waste?",
    "What types of waste do you accept?",
    "How do points work?",
    "Can I donate points?"
)

foreach ($query in $testQueries) {
    Write-Host "   Testing query: '$query'" -ForegroundColor Gray
    try {
        $encodedQuery = [System.Web.HttpUtility]::UrlEncode($query)
        $contextResponse = Invoke-WebRequest -Uri "http://localhost:3001/api/test-context?q=$encodedQuery" -Method GET
        $contextData = $contextResponse.Content | ConvertFrom-Json
        
        Write-Host "   ✅ Retrieved $($contextData.context_items_count) context items" -ForegroundColor Green
        if ($contextData.waste_type_found) {
            Write-Host "   🗑️  Waste type found: $($contextData.waste_type)" -ForegroundColor Cyan
        }
        Write-Host ""
    } catch {
        Write-Host "   ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
    }
}

Write-Host "✅ Testing Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Tip: You can also test in your browser:" -ForegroundColor Yellow
Write-Host "   Health: http://localhost:3001/api/health"
Write-Host "   Context: http://localhost:3001/api/test-context?q=Your%20question"

