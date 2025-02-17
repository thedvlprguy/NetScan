import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get API key from .env
SHODAN_API_KEY = os.getenv("SHODAN_API_KEY")
