const responses = require('./responses')

const WITHOUT_ID = '-_id -__v'

exports.findOne = async function(model, filter) {
    return model.findOne(filter)
        .select(WITHOUT_ID)
        .exec()
}
