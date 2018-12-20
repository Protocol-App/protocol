create table users (
user_id serial primary key,
user_first_name text,
user_last_name text,
user_phone_number text,
user_pin text,
user_email text,
default_location text,
user_title text,
school_id int,
emergency_steps_done boolean,
emergency_status text,
foreign key (school_id) references school (school_id)
);
