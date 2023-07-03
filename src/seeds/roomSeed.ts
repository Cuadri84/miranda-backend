import { faker } from "@faker-js/faker";
import { IRooms } from "../models/roomsModel";

const roomFacilities = [
  "Wifi",
  "TV",
  "Kitchen",
  "Free parking",
  "Air conditioning",
  "Bathtub",
  "Coffee set",
];

function fakeRoom(): IRooms {
  return {
    id: faker.datatype.uuid(),
    room_number: faker.datatype.number(),
    photo: faker.image.imageUrl(),
    photoTwo: faker.image.imageUrl(),
    photoThree: faker.image.imageUrl(),
    photoFour: faker.image.imageUrl(),
    photoFive: faker.image.imageUrl(),
    description: faker.lorem.sentence(),
    discountPercent: faker.datatype.string(),
    discount: faker.datatype.string(),
    cancellationPolicy: faker.lorem.paragraph(),
    bed_type: faker.helpers.arrayElement([
      "single",
      "double",
      "double-superior",
      "suite",
    ]),
    room_facilities: faker.helpers.arrayElements(roomFacilities, 3),
    room_rate: faker.datatype.float(),
    room_offer: faker.datatype.number(),

    room_status: faker.helpers.arrayElement(["available", "occupied"]),
  };
}

const rooms: IRooms[] = Array.from({ length: 10 }, fakeRoom);

console.log(rooms);
