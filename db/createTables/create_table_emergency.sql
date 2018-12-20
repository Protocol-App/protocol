create table emergency (
    emergency_id serial primary key,
    protocol_id int,
    initialized_by_user_id int,
    swiped boolean
);

