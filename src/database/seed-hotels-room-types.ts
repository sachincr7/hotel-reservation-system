import dataSource from './data-source';
import { Hotel } from 'src/entities/hotel.entity';
import { RoomType } from 'src/entities/room_type.entity';

type SeedRoomType = Omit<RoomType, 'id' | 'hotel' | 'hotel_id' | 'rooms' | 'inventories' | 'created_at' | 'updated_at'>;

type SeedHotel = Omit<Hotel, 'id' | 'rooms' | 'room_types' | 'created_at' | 'updated_at'> & {
  roomTypes: SeedRoomType[];
};

const seedHotels: SeedHotel[] = [
  {
    name: 'Grand Hotel',
    address: '123 Main St',
    location: 'City Center',
    roomTypes: [
      {
        name: 'Standard',
        description: 'Comfortable room with basic amenities',
        max_occupancy: 2,
        amenities: 'WiFi, TV, Work desk',
      },
      {
        name: 'Deluxe',
        description: 'Deluxe room with upgraded comfort',
        max_occupancy: 2,
        amenities: 'WiFi, Smart TV, Coffee machine',
      },
      {
        name: 'Suite',
        description: 'Separate living area with premium facilities',
        max_occupancy: 4,
        amenities: 'WiFi, Smart TV, Living area, Mini bar',
      },
    ],
  },
  {
    name: 'Sea Breeze Resort',
    address: '45 Ocean Drive',
    location: 'Beachfront',
    roomTypes: [
      {
        name: 'Garden View',
        description: 'Resort room with garden view',
        max_occupancy: 2,
        amenities: 'WiFi, TV, Balcony',
      },
      {
        name: 'Ocean View',
        description: 'Resort room with ocean view',
        max_occupancy: 3,
        amenities: 'WiFi, Smart TV, Balcony, Ocean view',
      },
      {
        name: 'Family Suite',
        description: 'Spacious suite for families',
        max_occupancy: 5,
        amenities: 'WiFi, Smart TV, Living area, Mini fridge',
      },
    ],
  },
  {
    name: 'Business Inn',
    address: '88 Corporate Blvd',
    location: 'Tech Park',
    roomTypes: [
      {
        name: 'Single',
        description: 'Compact room for solo travelers',
        max_occupancy: 1,
        amenities: 'WiFi, TV, Work desk',
      },
      {
        name: 'Executive',
        description: 'Ideal for business travelers',
        max_occupancy: 3,
        amenities: 'WiFi, Smart TV, Work desk, Iron',
      },
    ],
  },
];

async function run() {
  await dataSource.initialize();

  try {
    const hotelRepo = dataSource.getRepository(Hotel);
    const roomTypeRepo = dataSource.getRepository(RoomType);

    for (const seedHotel of seedHotels) {
      let hotel = await hotelRepo.findOne({
        where: {
          name: seedHotel.name,
          address: seedHotel.address,
          location: seedHotel.location,
        },
      });

      if (!hotel) {
        hotel = hotelRepo.create({
          name: seedHotel.name,
          address: seedHotel.address,
          location: seedHotel.location,
        });
        hotel = await hotelRepo.save(hotel);
      }

      for (const rt of seedHotel.roomTypes) {
        const existingRoomType = await roomTypeRepo.findOne({
          where: { hotel_id: hotel.id, name: rt.name },
        });

        if (existingRoomType) continue;

        const roomType = roomTypeRepo.create({
          ...rt,
          hotel_id: hotel.id,
        });

        await roomTypeRepo.save(roomType);
      }
    }
  } finally {
    await dataSource.destroy();
  }
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
