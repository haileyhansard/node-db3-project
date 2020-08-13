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

//this is like the posts of a user .get example from guided project on server.js file
// the scheme_id is the foreign key that references scheme.id - where
// the scheme_name is the value that targets the scheme's id - select
// schemes, schemes.id = steps.scheme_id - join
// the other required values for a step are step_number, instructions - select
// order by steps.step_number, it will automatically be in ascending order
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
