create table emergency (
    emergency_id serial primary key,
    protocol_id int,
    user_id int,
    swiped boolean,
    steps_done boolean,
    status text,
    initialized_by boolean,

    foreign key (protocol_id) references protocol (protocol_id),
    foreign key (user_id) references users (user_id)
);