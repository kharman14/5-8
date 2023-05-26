module.exports = (mongoose) => {
    const Region = mongoose.model(
      'regions',
      mongoose.Schema({
       regionName: {
          type: String
        },
      })
    );
  
    return Region;
  };