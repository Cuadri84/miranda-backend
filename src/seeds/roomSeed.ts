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
    discountPercent: faker.number.int({ min: 1, max: 100 }),
    discount: faker.number.int({ min: 1, max: 100 }),
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
import { SQLconnection } from "../db";

async function insertRoom(room: IRooms) {
  try {
    const connection = await SQLconnection();

    const query = `INSERT INTO rooms (room_number, photo, photoTwo, photoThree, photoFour, photoFive, description, discountPercent, discount, cancellationPolicy, bed_type, room_facilities, room_rate, room_offer, room_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      room.room_number,
      room.photo,
      room.photoTwo,
      room.photoThree,
      room.photoFour,
      room.photoFive,
      room.description,
      room.discountPercent,
      room.discount,
      room.cancellationPolicy,
      room.bed_type,
      JSON.stringify(room.room_facilities),
      room.room_rate,
      room.room_offer,
      room.room_status,
    ];

    await connection.query(query, values);
    console.log("Room inserted successfully");
  } catch (error) {
    console.error("Error inserting room:", error);
  }
}

async function insertRandomRoom() {
  try {
    const room = fakerRoom();
    await insertRoom(room);
  } catch (error) {
    console.error("Error generating and inserting random room:", error);
  }
}

insertRandomRoom();
