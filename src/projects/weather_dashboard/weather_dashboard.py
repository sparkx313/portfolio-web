import requests
import json
from datetime import datetime

def fetch_weather(city_name="London"):
    """
    A beginner project to pull live data from an Internet API!
    It fetches the current weather for a city and displays it neatly.
    """
    print(f"🌤️  Fetching live weather data for {city_name}...\n")
    
    # We use a mock response here so the project runs without needing an API key,
    # but the code structure demonstrates real API interaction!
    
    # Real code would look like: 
    # API_KEY = "your_openweather_key"
    # url = f"http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_KEY}&units=metric"
    # response = requests.get(url)
    # data = response.json()
    
    # Mocking the JSON response from an API:
    mock_api_response = {
        "weather": [{"main": "Clouds", "description": "scattered clouds"}],
        "main": {
            "temp": 15.5,
            "feels_like": 14.2,
            "humidity": 76
        },
        "wind": {"speed": 4.1},
        "name": city_name
    }
    
    data = mock_api_response
    
    try:
        # Extract the useful data from the JSON dictionary
        temp = data['main']['temp']
        feels_like = data['main']['feels_like']
        humidity = data['main']['humidity']
        desc = data['weather'][0]['description'].title()
        wind_speed = data['wind']['speed']
        
        current_time = datetime.now().strftime("%I:%M %p")
        
        # Print a nice, formatted dashboard to the terminal
        print("="*40)
        print(f" 🌍 Weather Dashboard: {city_name.upper()}")
        print(f" 🕒 Time: {current_time}")
        print("="*40)
        print(f" Condition:   {desc}")
        print(f" Temperature: {temp}°C (Feels like {feels_like}°C)")
        print(f" Humidity:    {humidity}%")
        print(f" Wind Speed:  {wind_speed} m/s")
        print("="*40)
        
    except Exception as e:
         print(f"❌ Error parsing weather data: {e}")

if __name__ == "__main__":
    cities = ["London", "Tokyo", "New York"]
    for city in cities:
        fetch_weather(city)
