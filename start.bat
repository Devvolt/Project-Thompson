echo "Updating necessary libs in 1 second..."
sleep 1
npm install
echo "Starting Webserver in 3 seconds..."
sleep 3
node ./app.js
echo "Server stopped. If this was unintended, please contact developers."
