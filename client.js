const dgram = require('dgram');
const protobuf = require('protobufjs');
const PORT = 8081;

let socket = dgram.createSocket({
    type: 'udp4'
});

// 和服务端逻辑相同
let clientSchema = protobuf.loadSync('./schema.proto');
let um = clientSchema.lookupType('user_message.user');

socket.on('message', (buf, rinfo) => {
    console.log('>>>>>>>>', buf);

    let msg = um.decode(buf);

    // 必须加上 配置信息 否则无法解析出数据
    console.log('>>>>>>>>',um.toObject(msg, {
        longs: String,
        enums: String,
        bytes: String,
        defaults: true,
        arrays: true,
        objects: true,
        oneof: true
    }));
    socket.close();
});

socket.bind(8081);