const database = require('../database/database')

exports.updateCompletedTask = async (request, response) => {
    const {isCompleted, itemId} = request.body

    try {
        await database.pool.query('UPDATE tasks SET iscompleted = $1 WHERE _id = $2', [isCompleted, itemId])
        return response.status(200).json({msg: 'Task Updated Successfully'})
    } catch (error) {
        return response.status(500).json({msg: 'Update Complete Failed: ', error})
    }
}