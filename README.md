📍 Enhanced Indian Pincode Lookup Web App
📝 Project Description
The Enhanced Indian Pincode Lookup Web App is a modern, user-friendly tool that allows users to search for detailed location information based on any valid 6-digit Indian pincode. It uses the official Postal Pincode API to fetch data in real time and offers a rich set of features to enhance usability, accessibility, and interaction.

🎯 Key Features
🔎 Pincode Search

Allows users to input a 6-digit Indian pincode and fetch detailed information about the associated post offices, district, and state.

🎤 Voice Input

Integrated with the browser’s Web Speech API to let users speak the pincode aloud for hands-free input (supported in Chrome).

🧠 Autocomplete Suggestions

Automatically suggests previously searched pincodes using a persistent local history stored in the browser.

✅ Real-time Input Validation

Enables the "Search" button only when the entered pincode is a valid 6-digit number, preventing unnecessary API calls.

📌 Result Display with Context

Displays a contextual message like:

"The pincode 110001 belongs to below:"

Then shows a clean, responsive table of results.

🗺️ Google Maps Integration

Each result row includes a "Map" link that opens the location in Google Maps based on area, city, and state.

🔄 Reset / Search Again

After each search, users can click a "Search Again" button to clear the results and perform a new lookup.

💾 Local Search History

Saves up to the last 10 unique searches in local storage for convenience.

📱 Mobile Responsive Design

Fully responsive layout using flexible CSS — works seamlessly on desktops, tablets, and smartphones.

🛠️ Technologies Used
HTML5 – Markup and structure

CSS3 – Styling and responsiveness

JavaScript (Vanilla) – Core logic and dynamic interactions

Web Speech API – For voice input

LocalStorage API – To persist search history

Postal Pincode API – For fetching real-time postal data

Google Maps (via URL) – For map location linking

🚀 How It Works
User enters or speaks a pincode.

Input is validated and submitted.

Fetch request is sent to https://api.postalpincode.in/pincode/{pincode}.

On success:

A message and results table are shown.

Input and buttons are hidden.

Option to reset and search again is displayed.

Each location includes a link to view on Google Maps.

📂 Use Cases
Quick postal lookups for logistics or delivery services.

Location verification for customer service teams.

Educational tool for understanding postal zones.

Utility for developers needing postal data validation.

🔐 Privacy Considerations
No data is sent to third-party services except the official pincode API.

Search history is stored locally in the user's browser only.

