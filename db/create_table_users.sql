create table users (
user_id serial primary key,
phone_number text,
temp_pin int,
admin boolean,
first_name text,
last_name text,
school_id int,
school_name text,
staff_location text
);
