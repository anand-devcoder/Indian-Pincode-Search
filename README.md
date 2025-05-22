📍 Enhanced Indian Pincode Lookup Web App <br>
📝 Project Description
The Enhanced Indian Pincode Lookup Web App is a modern, user-friendly tool that allows users to search for detailed location information based on any valid 6-digit Indian pincode. It uses the official Postal Pincode API to fetch data in real time and offers a rich set of features to enhance usability, accessibility, and interaction.
<br>
🎯 Key Features
🔎 Pincode Search
<br>
Allows users to input a 6-digit Indian pincode and fetch detailed information about the associated post offices, district, and state.
<br>
🎤 Voice Input
<br>
Integrated with the browser’s Web Speech API to let users speak the pincode aloud for hands-free input (supported in Chrome).
<br>
🧠 Autocomplete Suggestions
<br>
Automatically suggests previously searched pincodes using a persistent local history stored in the browser.
<br>
✅ Real-time Input Validation
<br>
Enables the "Search" button only when the entered pincode is a valid 6-digit number, preventing unnecessary API calls.
<br>
📌 Result Display with Context
<br>
Displays a contextual message like:
"The pincode 110001 belongs to below:"
Then shows a clean, responsive table of results.
<br>
🗺️ Google Maps Integration
<br>
Each result row includes a "Map" link that opens the location in Google Maps based on area, city, and state.
<br>
🔄 Reset / Search Again
<br>
After each search, users can click a "Search Again" button to clear the results and perform a new lookup.
<br>
💾 Local Search History
<br>
Saves up to the last 10 unique searches in local storage for convenience.
<br>
📱 Mobile Responsive Design
<br>
Fully responsive layout using flexible CSS — works seamlessly on desktops, tablets, and smartphones.
<br>
🛠️ Technologies Used
HTML5 – Markup and structure
<br>
CSS3 – Styling and responsiveness
<br>
JavaScript (Vanilla) – Core logic and dynamic interactions
<br>
Web Speech API – For voice input
<br>
LocalStorage API – To persist search history
<br>
Postal Pincode API – For fetching real-time postal data
<br>
Google Maps (via URL) – For map location linking
<br>
🚀 How It Works
1-User enters or speaks a pincode.
<br>
2-Input is validated and submitted.
<br>
3-Fetch request is sent to https://api.postalpincode.in/pincode/{pincode}.
<br>
4-On success:
<br>
    a).A message and results table are shown.
<br>
    b).Input and buttons are hidden.
<br>
    c).Option to reset and search again is displayed.
<br>
5-Each location includes a link to view on Google Maps.
<br>
📂 Use Cases <br>
1-Quick postal lookups for logistics or delivery services.
<br>
2-Location verification for customer service teams.
<br>
3-Educational tool for understanding postal zones.
<br>
4-Utility for developers needing postal data validation.
<br>
🔐 Privacy Considerations <br>
1-No data is sent to third-party services except the official pincode API.
<br>
2-Search history is stored locally in the user's browser only.

