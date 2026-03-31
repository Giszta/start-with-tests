import { useEffect, useState } from 'react';

type Weather = {
    city: string;
    temperature: number;
};

export function WeatherWidget() {
    const [weather, setWeather] = useState<Weather | null>(null);

    useEffect(() => {
        fetch('/api/weather')
        .then((res) => res.json())
        .then((data: Weather) => setWeather(data));
    }, []);

    if (!weather) return <div>Ładowanie pogody...</div>;

    return (
        <div>
        {weather.city}: {weather.temperature}°C
        </div>
    );
}