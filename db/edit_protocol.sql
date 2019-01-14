UPDATE protocol
SET 
protocol_1 = $1,
protocol_2 = $2,
protocol_3 = $3,
protocol_4 = $4,
protocol_5 = $5,
protocol_6 = $6,
protocol_7 = $7,
protocol_8 = $8,
protocol_9 = $9,
protocol_10 = $10


WHERE protocol_name = $11 and school_id = $12;