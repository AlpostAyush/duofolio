interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  location: string;
}

/**
 * @param location - city name or location string (e.g. "New York")
 * @returns WeatherData for that location
 */
export const fetchWeather = async (
  location: string = "New York"
): Promise<WeatherData> => {
  try {
    const apiKey = "59ca3da321e04fed8cf64655250803";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`;
    
    console.log("Fetching weather from:", url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Weather API error:", response.status, errorText);
      throw new Error(`Failed to fetch weather for "${location}": ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log("Weather data received:", data);
    
    return {
      temperature: Math.round(data.current.temp_c),
      description: data.current.condition.text,
      icon: data.current.condition.icon,
      location: data.location.name,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error(`Failed to fetch weather for "${location}": ${error instanceof Error ? error.message : String(error)}`);
  }
};
