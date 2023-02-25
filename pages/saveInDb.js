import Record from "../models/record.js";

const saveInDb = (data, date) => {
  Record.find({ bankId: data.bankId }, async (err, lastRecords) => {
    if (err) {
      console.log(err);
      return;
    }
    //Getting the last record from all records with that bankId from the db
    let lastRecord;
    if (lastRecords.length > 0) {
      lastRecord = lastRecords.reduce(
        (previousLastRecord, currentLastRecord) => {
          return currentLastRecord > previousLastRecord
            ? currentLastRecord
            : previousLastRecord;
        }
      );
    } else {
      lastRecord = null;
    }
    if (
      lastRecord == null ||
      +lastRecord.createdAt + 1000 * 60 * 60 * 24 < +date
    ) {
      const record = new Record();
      record.bankId = data.bankId;
      record.createdAt = date;
      record.updatedAt = date;
      record.values = data.data;
      record.name = data.name;
      await record.save((err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
      return;
    } else {
      lastRecord.updatedAt = date;
      lastRecord.values = data.data;
      await lastRecord.save((err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    }
  });
};

export default saveInDb;
