exports.User = [
  { "_id": "000000000000000000000001",
    "created": new Date(2014,0,1),
    "username": "ilya kantor",
    "email": "iliakan@gmail.com",
    "password": "123",
    "avatar": "1.jpg",
    "following": []
  },
  { "_id": "000000000000000000000002",
    "created": new Date(2014,0,1),
    "username": "tester",
    "email": "tester@mail.com",
    "password": "123",
    "avatar": "2.jpg",
    "following": ["000000000000000000000001"]
  },
  { "_id": "000000000000000000000003",
    "created": new Date(2014,0,1),
    "username": "vasya",
    "email": "vasya@mail.com",
    "password": "123",
    "avatar": "3.jpg",
    "following": ["000000000000000000000001", "000000000000000000000002"]
  }
];

exports.Message = [
  { "_id": "100000000000000000000001",
    "content": "Message 1",
    "created": new Date(2014, 0, 1),
    "user": "000000000000000000000001"
  },
  { "_id": "100000000000000000000002",
    "content": "Message 2",
    "created": new Date(2014, 0, 2),
    "user": "000000000000000000000002"
  },
  { "_id": "100000000000000000000003",
    "content": "Message 3",
    "created": new Date(2014, 0, 3),
    "user": "000000000000000000000002"
  },
  { "_id": "100000000000000000000004",
    "content": "Message 4",
    "created": new Date(2014, 0, 4),
    "user": "000000000000000000000003"
  },
  { "_id": "100000000000000000000005",
    "content": "Message 5",
    "created": new Date(2014, 0, 5),
    "user": "000000000000000000000003"
  },
  { "_id": "100000000000000000000006",
    "content": "Message 6",
    "created": new Date(2014, 0, 6),
    "user": "000000000000000000000003"
  }
];

exports.Session = [
  { "_id" : "200000000000000000000001", "session" : "{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":\"000000000000000000000001\"}}", "expires" : new Date("2015-01-24T18:52:24.306Z") },
  { "_id" : "200000000000000000000002", "session" : "{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":\"000000000000000000000002\"}}", "expires" : ("2015-01-24T18:52:24.306Z") },
  { "_id" : "200000000000000000000003", "session" : "{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":\"000000000000000000000003\"}}", "expires" : ("2015-01-24T18:52:24.306Z") }
];