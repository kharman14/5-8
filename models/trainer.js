module.exports = (mongoose) => {
    const trainerSchema = mongoose.Schema({
      username: {
        type: String
      },
      password: {
        type: String
      },
      displayName: {
        type: String
      },
      email: {
        type: String
      },
      region: {
        type: String
      },
      pokemon: {
        type: String
      },
      type: {
        type: String
      },
    });
  
    return mongoose.model('trainers', trainerSchema);
  };