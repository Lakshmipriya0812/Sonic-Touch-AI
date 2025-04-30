from typing import Any, Dict, Text, List, Tuple
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import logging

logger = logging.getLogger(__name__)

class ActionNavigate(Action):
    def name(self) -> Text:
        return "action_navigate"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]
    ) -> List[Dict[Text, Any]]:

        intent = tracker.latest_message.get("intent", {}).get("name", "")
        subcategory = tracker.get_slot("subcategory")
        subsubcategory = tracker.get_slot("subsubcategory")

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

        valid_combinations: List[Tuple[str, str]] = [
            ("men", "t-shirts"), ("men", "shirts"), ("men", "pants"), ("men", "trousers"), ("men", "coats"), ("men", "blazers"),
            ("women", "t-shirts"), ("women", "tops"), ("women", "dresses"), ("women", "bottoms"), ("women", "sleepwear"), ("women", "winterWear"),
            ("baby", "boy"), ("baby", "girl"), ("baby", "unisex"),
            ("teen", "boy"), ("teen", "girl"),

            ("bird", "toy"), ("bird", "food"),
            ("dog", "toy"), ("dog", "food"),
            ("cat", "toy"), ("cat", "food")
        ]

        if subcategory and subsubcategory:
            if (subcategory, subsubcategory) in valid_combinations:
                if subcategory in ["men", "women", "baby", "teen"]:
                    url = f"/clothing/{subcategory}/{subsubcategory}"
                elif subcategory in ["dog", "cat", "bird"]:
                    url = f"/pets/{subcategory}/{subsubcategory}"
                else:
                    url = "/"

                dispatcher.utter_message(
                    text=f"Navigating to {url}...",
                    metadata={"navigate_to": url}
                )
                logger.info(f"User navigated to: {url}")
                return [SlotSet("last_page", url),
                    SlotSet("subcategory", None),
                    SlotSet("subsubcategory", None)
                    ]

            else:
                dispatcher.utter_message(
                    text=f"Sorry, '{subcategory} {subsubcategory}' is not a valid section. Please try again with a valid combination."
                )
                logger.warning(f"Invalid navigation: ({subcategory}, {subsubcategory})")
                return []

        if intent in navigation_links:
            url = navigation_links[intent]
            dispatcher.utter_message(
                text=f"Navigating to {url}...",
                metadata={"navigate_to": url}
            )
            logger.info(f"User navigated to: {url}")
            return [SlotSet("last_page", url),
                    SlotSet("subcategory", None),
                    SlotSet("subsubcategory", None)
                    ]

        else:
            dispatcher.utter_message(text="I'm not sure where to take you. Can you specify the section?")
            logger.warning(f"Unknown navigation intent: {intent}")
            return []


class ActionRememberLastPage(Action):

    def name(self) -> Text:
        return "action_remember_last_page"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]
    ) -> List[Dict[Text, Any]]:

        last_page = tracker.get_slot("last_page")

        if last_page:
            response = f"The last page you visited was {last_page}. Would you like to go back?"
            dispatcher.utter_message(text=response, metadata={"navigate_to": last_page})
            logger.info(f"Remembering last page: {last_page}")
        else:
            response = (
                "I don't remember the last page you visited. "
                "You can try saying things like 'Take me to clothing' or 'Show me my cart'."
            )
            dispatcher.utter_message(text=response)

        return []
