import { NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json(
      { error: 'City parameter is required' },
      { status: 400 }
    );
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY;
  
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'Server configuration error - API key missing' },
      { status: 500 }
    );
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
      {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false // Only for development!
        })
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error:', error);
    if (error.response) {
      return NextResponse.json(
        { 
          error: error.response.data?.message || 'Failed to fetch weather data',
          details: error.response.data?.cod === '404' ? 'City not found' : undefined
        },
        { status: error.response.status }
      );
    } else if (error.request) {
      return NextResponse.json(
        { error: 'No response received from weather API' },
        { status: 502 }
      );
    } else {
      return NextResponse.json(
        { error: 'Error setting up weather API request' },
        { status: 500 }
      );
    }
  }
}