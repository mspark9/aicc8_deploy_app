const database = require('../database/database')
const {v4: uuidv4} = require('uuid')

exports.postTask = async (request, response) => {
    const _id = uuidv4();
    const {title, description, date, isCompleted, isImportant, userId} = request.body

    try {
        await database.pool.query(
            'INSERT INTO tasks (_id, title, description, date, isCompleted, isImportant, userId) VALUES ($1, $2, $3, $4, $5, $6, $7)', [_id, title, description, date, isCompleted, isImportant, userId]
        )
        return response.status(201).json({msg: 'Task Create Sucessfully'})
    } catch (error) {
        return response.status(500).json({msg: `Post Task Fail: ${error}`})
    }
}