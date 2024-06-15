const PouchDB = require("pouchdb");
const findPlugin = require("pouchdb-find");
const upsertPlugin = require("pouchdb-upsert");
const { v4: uuid } = require("uuid");

PouchDB.plugin(findPlugin);
PouchDB.plugin(upsertPlugin);

class Database {
    db = null;

    constructor() {
        this.db = new PouchDB("pesto-db");
    }

    async write(table, document) {
        try {
            const _id = uuid();
            await this.db.put({
                _id, table, document,
            });

            return Promise.resolve(_id);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async update(table, document, _id, _rev) {
        try {
            await this.db.upsert(_id, (doc) => {
                doc.table = table;
                doc.document = document;
                return doc;
            });

            return Promise.resolve(_id);
        } catch (err) {
            return Promise.reject(err);
        }
    }    

    async find(query) {
        try {
            const {docs} = await this.db.find(query);
            return Promise.resolve(docs);
        } catch (err) {
            return Promise.reject(err);
        }
    }    
}

const database = new Database();
module.exports = database;
