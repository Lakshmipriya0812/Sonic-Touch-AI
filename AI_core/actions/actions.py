from typing import Any, Dict, Text, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import logging

logger = logging.getLogger(__name__)

class ActionNavigate(Action):
    """Handles page navigation by sending a navigation event to the frontend."""

    def name(self) -> Text:
        return "action_navigate"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]
    ) -> List[Dict[Text, Any]]:

        # Get the last user intent
        intent = tracker.latest_message.get("intent", {}).get("name", "")
        
        # Define navigation mappings
        navigation_links = {
            "navigate_home": "/",
            "navigate_about": "/about",
            "navigate_contact": "/contact",
            "navigate_login": "/login",
            "navigate_signup": "/signup",
            "navigate_clothing": "/clothing",
            "navigate_men_clothing": "/clothing/men",
            "navigate_women_clothing": "/clothing/women",
            "navigate_baby_clothing": "/clothing/baby",
            "navigate_pets": "/pets",
            "navigate_dogs": "/pets/dogs",
            "navigate_cats": "/pets/cats",
            "navigate_birds": "/pets/birds",
            "navigate_cart": "/cart",
            "navigate_checkout": "/checkout",
            "navigate_orders": "/orders",
            "navigate_admin_login": "/admin/login",
            "navigate_admin_dashboard": "/admin/dashboard",
            "navigate_admin_products": "/admin/products",
        }

        if intent in navigation_links:
            url = navigation_links[intent]
            
            # ✅ Send structured response for frontend
            dispatcher.utter_message(
                text=f"Navigating to {url}...",
                metadata={"navigate_to": url}
            )
            
            logger.info(f"✅ User navigated to: {url}")  # ✅ Log navigation
            return [SlotSet("last_page", url)]  # ✅ Store last visited page

        else:
            logger.warning(f"⚠️ Unknown navigation intent: {intent}")  # ✅ Log missing intents
            dispatcher.utter_message(text="I'm not sure where to take you. Can you specify the section?")
            return []

class ActionRememberLastPage(Action):
    """Tells the user their last visited page"""

    def name(self) -> Text:
        return "action_remember_last_page"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]
    ) -> List[Dict[Text, Any]]:

        last_page = tracker.get_slot("last_page")

        if last_page:
            response = f"The last page you visited was {last_page}. Would you like to go back?"
            dispatcher.utter_message(text=response, metadata={"navigate_to": last_page})
            logger.info(f"✅ Remembering last page: {last_page}")
        else:
            response = (
                "I don't remember the last page you visited. "
                "You can try saying things like 'Take me to clothing' or 'Show me my cart'."
            )
            dispatcher.utter_message(text=response)

        return []
