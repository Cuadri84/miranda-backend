Creacion de tablas

CREATE TABLE bookings (
   id int PRIMARY KEY,
   bookingID int,
   userName varchar(10),
   orderDate datetime,
   checkIn date,
   checkOut date,
   specialRequest varchar(255),
   roomType varchar(30),
   status varchar(20)
);
CREATE TABLE rooms (
  id int,
  room_number int PRIMARY KEY,
  photo varchar(255),
  photoTwo varchar(255),
  photoThree varchar(255),
  photoFour varchar(255),
  photoFive varchar(255),
  description text,
  discountPercent float,
  discount float,
  cancellationPolicy text,
  bed_type varchar(50),
  room_facilities json,
  room_rate float,
  room_offer float,
  room_status varchar(15)
);
CREATE TABLE contact (
   id int PRIMARY KEY,
   date date,
   userName varchar(10),
   userEmail varchar(20),
   userPhone varchar(15),
   messageSubject varchar(50),
   messageBody text,
   archived tinyint(1)
);

CREATE TABLE users (
    id INT PRIMARY KEY,
    photo VARCHAR(255),
    name VARCHAR(30),
    position VARCHAR(30),
    email VARCHAR(100),
    phone INT,
    date DATE,
    description TEXT,
    state VARCHAR(15)
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

