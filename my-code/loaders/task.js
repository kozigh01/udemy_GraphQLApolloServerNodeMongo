const Task = require('../database/models/task');

module.exports.batchTasks = async (taskIds) => {
  console.log("===Task dataloader, taskids::", taskIds);

  const tasks = await Task.find({ _id: { $in: taskIds } });
  return taskIds.map(id => tasks.find(task => task.id === id));
}