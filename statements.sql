Creacion de tablas

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  roomID INT,
  userName VARCHAR(10),
  orderDate DATETIME,
  checkIn DATE,
  checkOut DATE,
  specialRequest VARCHAR(255),
  roomType ENUM('Single', 'Double', 'Suite', 'Suite Deluxe'),
  status ENUM('Check In', 'Check Out', 'In Progress'),
  FOREIGN KEY (roomID) REFERENCES rooms(id)
);
CREATE TABLE rooms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  room_number INT,
  photo VARCHAR(255),
  photoTwo VARCHAR(255),
  photoThree VARCHAR(255),
  photoFour VARCHAR(255),
  photoFive VARCHAR(255),
  description TEXT,
  discountPercent INT,
  discount INT,
  cancellationPolicy TEXT,
  bed_type VARCHAR(50),
  room_facilities JSON,
  room_rate INT,
  room_offer INT,
  room_status ENUM('Available', 'Booked'),
  CHECK (room_status IN ('Available', 'Booked'))
);
CREATE TABLE contact (
   id int PRIMARY KEY AUTO_INCREMENT,
   `date` date,
   userName varchar(10),
   userEmail varchar(40),
   userPhone varchar(15),
   messageSubject varchar(50),
   messageBody text,
   archived tinyint(1)
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    photo VARCHAR(255),
    `name` VARCHAR(50),
    position ENUM('manager', 'recepcionist', 'waitress'),
    email VARCHAR(40),
    phone VARCHAR(15),
    `date` DATE,
    `description` TEXT,
    `state` ENUM('active', 'inactive')
);


-- REST-----------------------------------------
------------------------------------------------
--BOOKINGS
--get all
SELECT * FROM bookings
-- get one
SELECT * FROM bookings WHERE id = ?
--post
INSERT INTO bookings SET ?
--put
UPDATE bookings SET ? WHERE id = ?
--delte
DELETE FROM bookings WHERE id = ?
------------------------------------------------
--PARA VER CUANDO EZTA BOOKED UNA ROOM par ael calendario
SELECT * FROM bookings
INNER JOIN rooms ON rooms.id = bookings.roomID
WHERE bookings.roomID = 4
AND bookings.checkIn >= 'XXXX-XX-XX XX:XX:XX'
AND bookings.checkOut <= 'XXXX-XX-XX';

Las X las cambias por la fecha que sea