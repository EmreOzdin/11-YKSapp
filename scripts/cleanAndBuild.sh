#!/bin/bash
echo "🧹 Cleaning project..."
cd android
./gradlew clean
cd ..

echo "📦 Reinstalling node modules..."
rm -rf node_modules
npm install

echo "🔧 Running AsyncStorage fix..."
npm run fix-asyncstorage-comprehensive

echo "🚀 Building project..."
npx expo run:android
