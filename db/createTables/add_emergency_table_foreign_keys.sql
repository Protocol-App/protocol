ALTER TABLE emergency
add foreign key (protocol_id) references protocol (protocol_id)
add foreign key (initialized_by_user_id) references users (user_id);
