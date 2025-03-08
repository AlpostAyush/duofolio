import React, { useEffect, useState } from "react";
import { fetchWeather } from "../../utils/weatherApi"; 
import { Card, CardContent } from "@/components/UI/card";
import { MapPin } from "lucide-react";
import { Input } from "@/components/UI/input";
import { Button } from "@/components/UI/button";
import { useToast } from "@/hooks/use-toast";
interface WeatherState {
  temperature: number;
  description: string;
  icon: string;
  location: string;
}
const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherState>({
    temperature: 0,
    description: "",
    icon: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [locationInput, setLocationInput] = useState("New York");
  const { toast } = useToast();
  const fetchWeatherData = async (location: string) => {
    try {
      setLoading(true);
      const data = await fetchWeather(location);
      setWeather(data);
      setError("");
      toast({
        title: "Weather Updated",
        description: `Weather information for ${data.location} has been updated.`,
      });
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try a different location.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeatherData("New York");
  }, []);
  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationInput.trim()) {
      fetchWeatherData(locationInput.trim());
    }
  };
  // WeatherAPI.com already provides a full icon URL
  const iconUrl = weather.icon || "";

  return (
    <div className="space-y-4">
      <form onSubmit={handleLocationSubmit} className="flex space-x-2">
        <Input
          placeholder="Enter city or location"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" size="sm">
          Update
        </Button>
      </form>
      {loading ? (
        <Card className="w-full p-4">Loading weather...</Card>
      ) : error ? (
        <Card className="w-full p-4 text-red-500">{error}</Card>
      ) : (
        <Card className="w-full">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <MapPin className="h-4 w-4 text-indigo-500" />
                <p className="text-sm font-medium">{weather.location}</p>
              </div>
              <p className="text-2xl font-bold">{weather.temperature}°C</p>
              <p className="text-sm text-gray-500 capitalize">
                {weather.description}
              </p>
            </div>
            {weather.icon && (<div><img src={iconUrl} alt={weather.description} /></div>)}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherWidget;
