create table emergency (
    emergency_id serial primary key,
    protocol_id int,
    initialized_by_user_id int,
    swiped boolean,

    foreign key (protocol_id) references protocol (protocol_id),
    foreign key (initialized_by_user_id) references users (user_id)
);