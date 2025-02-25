const DeviceInfoSchema = new mongoose.Schema({
    macAddress: {
      type: String,
      unique : true,
      required : true
    },
    osType: {
      type: String,
      
    },
    upTime: {
      type: String,
      
    },
    totalMemory: {
      type: String,
      
    },
    freeMemory: {
      type: String,
      
    },
    usedMemory: {
      type: String,
      
    },
    memoryUsagePer: {
      type: String,
      
    },
    cpuModel: {
      type: String,
      
    },
    cpuSpeed: {
      type: Number,
      
      default: 0, // Default value set to 0
    },
    cores: {
      type: Number,
      
    },
    cpuUsage: {
      type: Number,
      
      default: 0, // Default value set to 0
    },
  });



  const DeviceModal = mongoose.model('Device', DeviceInfoSchema, 'devices');

 

export default DeviceModal;