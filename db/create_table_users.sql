create table users (
user_id serial primary key,
user_first text,
user_last text,
user_phone_number text,
user_pin int,
user_email text,
user_default_location text,
user_title text,
school_id int,
foreign key (school_id) references school (school_id)
);
