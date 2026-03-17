#!/bin/bash

# Base URL
BASE_URL="http://localhost:3001/api/weblink"

echo "--- 1. Testing Show All Weblinks ---"
curl -s $BASE_URL | jq . || curl -s $BASE_URL
echo -e "\n"

echo "--- 2. Testing Add New Weblink ---"
curl -s -X POST -H "Content-Type: application/json" \
    -d '{"title":"DuckDuckGo", "url":"https://duckduckgo.com", "rating":4}' \
    $BASE_URL | jq . || curl -s -X POST -H "Content-Type: application/json" -d '{"title":"DuckDuckGo", "url":"https://duckduckgo.com", "rating":4}' $BASE_URL
echo -e "\n"

echo "--- 3. Testing Show Specific Weblink (id: 6) ---"
curl -s "$BASE_URL/6" | jq . || curl -s "$BASE_URL/6"
echo -e "\n"

echo "--- 4. Testing Update Weblink (id: 6) ---"
curl -s -X PUT -H "Content-Type: application/json" \
    -d '{"rating":5}' \
    "$BASE_URL/6" | jq . || curl -s -X PUT -H "Content-Type: application/json" -d '{"rating":5}' "$BASE_URL/6"
echo -e "\n"

echo "--- 5. Testing Delete Weblink (id: 1) ---"
curl -s -X DELETE "$BASE_URL/1" | jq . || curl -s -X DELETE "$BASE_URL/1"
echo -e "\n"

echo "--- 6. Testing Show Weblinks by Rating (5) ---"
curl -s "$BASE_URL/rating/5" | jq . || curl -s "$BASE_URL/rating/5"
echo -e "\n"

echo "--- 7. Testing Show .com Weblinks ---"
curl -s "$BASE_URL/filter/com" | jq . || curl -s "$BASE_URL/filter/com"
echo -e "\n"
