const EventEmitter = require('events');
const {verifyEvaluationCompleted} = require("../repositories/evaluationCompletedRepository");

const completedEvaluationEmitter = new EventEmitter();

const EventListenerFunc = async (evaluation_id, employed_id) => {
    await verifyEvaluationCompleted(evaluation_id, employed_id);
}


completedEvaluationEmitter.on('completedEvaluation', EventListenerFunc);

module.exports = completedEvaluationEmitter;
