'use strict';

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      return this.model.findOne({ where: { id } });
    }
    else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  async update(id, data) {
    const record = await this.model.findOne({ where: { id } });
    return await record.update(data);
  }
  

  delete(id) {
    return this.model.destroy({ where: { id } });
  }

}

module.exports = DataCollection;
