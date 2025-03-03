import { StaticImageData } from 'next/image';

// These imports will resolve to src/assets/[filename]
import logo from '@/assets/logo.png';
import add_icon from '@/assets/add_icon.png';
import order_icon from '@/assets/order_icon.png';
import profile_image from '@/assets/profile_image.png';
import upload_area from '@/assets/upload_area.png';
import parcel_icon from '@/assets/parcel_icon.png';

interface Assets {
  logo: StaticImageData;
  add_icon: StaticImageData;
  order_icon: StaticImageData;
  profile_image: StaticImageData;
  upload_area: StaticImageData;
  parcel_icon: StaticImageData;
}

export const assets: Assets = {
  logo,
  add_icon,
  order_icon,
  profile_image,
  upload_area,
  parcel_icon,
};

export const url: string = 'http://localhost:4000';
