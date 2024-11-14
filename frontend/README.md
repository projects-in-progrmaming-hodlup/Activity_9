# HodlUP Front End 

HodlUP is a React-based web application that allows users to set custom notifications for cryptocurrency price or percentage changes. Users can select the type of change they want to monitor, specify a threshold, and choose their preferred notification method. The app offers flexibility in notification preferences to help users stay informed without constantly monitoring markets.

## Features

- **Customizable Notifications**: Users can select between price or percentage changes as the trigger for notifications.
- **Threshold Setting**: Users can set a specific threshold value for alerts.
- **Flexible Notification Methods**: Choose from various notification methods, including Email, SMS, Phone Call, Slack, Discord, and WhatsApp.

## Getting Started

To run this application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/projects-in-progrmaming-hodlup/Activity_8.git
   cd Activity_8

2. **Install dependencies**:
    ```bash
    npm install


3. **Run the application**:
   ```bash
   npm start


4. **If it didn't start, open your browser and go to http://localhost:3000.**


## How to Use

1.	Set Notification:
-  **Notification Type**: Select either “Price” or “Percentage” change as the notification trigger.
-  **Set Threshold**: Enter your desired threshold value (numeric input).
-  **Notification Method**: Choose a preferred notification method from a dropdown (Email, SMS, Phone Call, Slack, Discord, or WhatsApp).
2.  Confirmation:
- 	After submitting your alert settings, you’ll see a confirmation screen with options to modify or finalize your settings.
- **Modify Settings** : If you want to make changes, click “Modify Setting” to return to the form with your previous inputs saved.
- **Finalize Setting**: When satisfied with your setup, click “Done” to finalize your alert settings and wait to receive notifications of your preferred method. 


### Component Documentation

1. **NotificationForm.js**: 
   - Purpose: Allows users to set their notification preferences.
   - Props:
     - `onSubmit`: Function to call when the form is submitted.
     - `initialData`: Initial values to populate the form (useful for modifying settings).
   - State:
     - `notificationType`: Tracks whether the alert is based on price or percentage. The state defaults to 'Price' and is updated with the user input (using initialData.notificationType if modifying settings).  
     - `thresholdValue`: Holds the user-defined threshold for the alert. The state defaults to an empty string ('') and is updated with the user input (using initialData.thresholdValue if modifying settings)
     - `notificationMethod`: Stores the preferred method of notification (e.g., Email, SMS). The state defaults to 'Email' and is updated with the user input (using initialData.notificationMethod if modifying settings)

2. **Dropdown.js**: 
   - Purpose: Renders a dropdown selection for user input.
   - Props:
     - `label`: Label for the dropdown.
     - `options`: Array of options for selection.
     - `onSelect`: Function to call with the selected option.

3. **Button.js**: 
   - Purpose: A reusable button component for submitting forms or triggering actions.
   - Props:
     - `text`: Text to display on the button.
     - `onClick`: Function to call when the button is clicked.

4. **Confirmation.js**: 
   - Purpose: Displays the confirmation page with options for modifying or finalizing settings.
   - Props:
     - `alertData`: Data about the alert settings to be confirmed.
     - `onModify`: Function to call when the user wants to modify settings.
