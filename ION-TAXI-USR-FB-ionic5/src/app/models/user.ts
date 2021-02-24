export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  location_lat: number;
  location_lng: number;
  token: string;
  profile_img?: string;
  rideId: number;
  location: string;
}


