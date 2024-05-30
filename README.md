Features
   
    1.	Real-time Messaging: WebSocket integration for real-time chat.
	2.	AI Responses: Handles AI responses and displays them in the chat.
	3.	Suggestions: Displays suggestion buttons below AI responses.
	4.	Actions: Users can like, dislike, and copy AI responses.
    5.  Mulitple chat sessions.

Instructions to Run

	1.	Backend:
	•	Navigate to the backend directory.
	•	Install dependencies: pip install -r requirements.txt.
	•	Run the server: uvicorn src.main:app --reload.

	2.	Frontend:
	•	Navigate to the frontend directory.
	•	Install dependencies: npm install.
	•	Start the application: npm start.

	3. 	Navigate to /backend -- rename .env-sample to .env and put your OPEN AI keys.

The application will be accessible at https://further-ai.vercel.app/ or http://localhost:3000 (locally)

Summary of Changes

	•	Implemented WebSocket communication for real-time chat.
	•	Added REST API integration for AI-generated responses.
	•	Handled message broadcasting and client connection management to prevent redundancy and ensure smooth operation.
    •   Most of the features/buttons are functional and working from new chat, share, like, dislike to clipboard.

Additional Information

	•	The WebSocket server manages client connections and broadcasts messages to all connected clients except the sender.
	•	The client-side application sends messages through both WebSocket and REST API, ensuring real-time updates and AI integration.
    •   Share button copies the app url and info shows the dummy text.
    •	Recommended buttons shown are static, though made a REST API to generate suggestions but time constraints.
