create table chat (
    school_id int,
    emergency_id int,
    user_id int,
    chat_name text,
    chat_message text,
    chat_timestamp timestamp,

    foreign key (school_id) references school (school_id)
    foreign key (emergency_id) references emergency (emergency_id)
);