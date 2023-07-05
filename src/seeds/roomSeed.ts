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

export function fakerRoom(): IRooms {
  return {
    room_number: faker.number.int({ min: 1, max: 999 }),
    photo: faker.image.url(),
    photoTwo: faker.image.url(),
    photoThree: faker.image.url(),
    photoFour: faker.image.url(),
    photoFive: faker.image.url(),
    description: faker.lorem.sentence(),
    discountPercent: faker.number.int({ min: 1, max: 999 }),
    discount: faker.number.int({ min: 1, max: 999 }),
    cancellationPolicy: faker.lorem.paragraph(),
    bed_type: faker.helpers.arrayElement([
      "single",
      "double",
      "double-superior",
      "suite",
    ]),
    room_facilities: faker.helpers.arrayElements(roomFacilities, 3),
    room_rate: faker.number.int({ min: 1, max: 999 }),
    room_offer: faker.number.int({ min: 1, max: 999 }),
    room_status: faker.helpers.arrayElement(["available", "occupied"]),
  };
}
