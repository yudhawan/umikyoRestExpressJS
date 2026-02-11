const { collection } = require("./connection");

class Field {
  constructor(fieldName) {
    this.fieldName = fieldName;
  }

  async getOne(key, val) {
    const col = collection(this.fieldName);
    const result = await col.findOne({ [key]: val });
    return result;
  }

  async getMany(key, val) {
    const col = collection(this.fieldName);
    const cursor = col.find({ [key]: val });
    const data = await cursor.toArray();
    return data;
  }

  async getAll() {
    const col = collection(this.fieldName);
    const cursor = col.find({});
    const result = await cursor.toArray();
    return result;
  }

  async insert(datum) {
    const col = collection(this.fieldName);
    try {
      const result = await col.insertOne(datum);
      return result;
    } catch (err) {
      console.log(`Insert function : ${err}`);
      throw err;
    }
  }

  async insertBulk(data) {
    const col = collection(this.fieldName);
    try {
      const result = await col.insertMany(data);
      return result;
    } catch (err) {
      console.log(`Insert function : ${err}`);
      throw err;
    }
  }

  async update(filter, data) {
    const col = collection(this.fieldName);
    try {
      const result = await col.updateOne(filter, { $set: data });
      return result;
    } catch (err) {
      console.log(`Update Failed : ${err}`);
      throw err;
    }
  }

  async updateBulk(filter, data) {
    const col = collection(this.fieldName);
    try {
      const result = await col.updateMany(filter, { $set: data });
      return result;
    } catch (err) {
      console.log(`Update Failed : ${err}`);
      throw err;
    }
  }
}

module.exports = { Field };
