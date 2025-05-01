// models/Course.js
import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  description: String,

  focusedMajor: { 
    type: String, 
    required: true 
},
  credits: { 
    type: Number, 
    required: true 
},
  createdBy:  {    
    type: String, 
  }
    // replace with following to add REAL teacher id once created and authenticated. 
    // type: mongoose.Schema.Types.ObjectId, 
    // ref: 'Teacher', 
    // required: true 
})

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
