import { outbox } from 'file-transfer';
import * as fs from 'fs';

let json_data = {
  "_id": "58fe4408726f862be04fa0f2",
  "guid": "189fbd1a-968e-48f3-9311-247ca188e907",
  "registered": "2017-08-21T20:00:00 GMT-07:00",
  "latitude": -2.932463,
  "longitude": 151.797305,
};

fs.writeFileSync("test.txt", json_data, "json");

outbox.enqueueFile("/private/data/test.txt")
  .then(ft => console.log(`Transfer of ${ft.name} successfully queued.`))
  .catch(err => console.error(`Failed to schedule transfer: ${err}`));
