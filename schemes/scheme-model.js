const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
}

function findSteps(id) {
    return db('steps')
        .where({ scheme_id: id})
        .join('schemes', 'schemes.id', '=', 'steps.scheme_id')
        .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .orderBy('steps.step_number')  
}

function add(scheme) {
    return (
        db('schemes')
            .insert(scheme)
            .returning('id')
            .then(ids => {
                const id = ids[0];
                return findById(id);
            })
    );
}

function update(changes, id) {
    return db('schemes')
        .where({ id })
        .update(changes)
        .then(() => {
            return findById(id)
        })
}

function remove(id) {
    return db('schemes')
        .where({ id })
        .del();
}
