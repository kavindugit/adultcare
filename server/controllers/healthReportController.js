
import adultModel from '../models/adultModel.js';
import noteModel from '../models/noteModel.js';


export const getAdultData = async (req, res) => {
    try {      
      const { selectedValueAdult } = req.query;
        const adult = await adultModel.findOne({nic:{selectedValueAdult}.selectedValueAdult});
        
        if(!adult) {
            return res.json({success: false, message: 'User not found'});
        }

        res.json({
            success: true, 
            adultData: {
                name: adult.fullName,
                nic: adult.nic,
                age: adult.age,
                bloodGroup: adult.bloodGroup,
                dietaryPreference: adult.dietaryPreference,
                medications:adult.medications,
                smokingStatus: adult.smokingStatus
            }
        });
    
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}  

export const getNotes = async (req, res) => {
  try {      
    const { selectedValueAdult } = req.query;
    const notes = await noteModel.find({adultId:{selectedValueAdult}.selectedValueAdult});
      
      if(!notes || notes.length == 0 ) {
          return res.json({success: false, message: 'Notes not found'});
      }

      const adultNotes = notes.map((note) => ({
        note: note.note,
        adultId: note.adultId,
        noteType: note.noteType,
      }));
  
      res.json({
        success: true,
        notes: adultNotes,
      });
  
  } catch (error) {
      return res.json({ success: false, message: error.message });
  }
}  

export const updateNote = async(req , res)=>{
    const {note, noteType, adultId} = req.body;

    if(!note) {
        return res.json({success: false, message: 'Please fill the note'});
    }
    if( !noteType) {
      return res.json({success: false, message: 'Please pass the note type'});
    }
    if(!adultId) {
      return res.json({success: false, message: 'Please pass the adult ID'});
    }

    try{
      
      const existingnote = await noteModel.findOne({
        "adultId": adultId, "noteType": noteType
      });
      if(!existingnote || existingnote.length == 0 ) {  
        return res.json({success: false, message: 'No Record Found'});    
      } else {  
        existingnote.note = note;  
        await existingnote.save();  
        return res.json({success: true, message: 'Updated successfully'});    
      }

    }catch(error) {
        console.error('Error:', error);
        return res.json({success: false, message: error.message});
    }
}

export const addNote = async(req , res)=>{
  const {note, noteType, adultId} = req.body;

  if(!note) {
      return res.json({success: false, message: 'Please fill the note'});
  }
  if( !noteType) {
    return res.json({success: false, message: 'Please pass the note type'});
  }
  if(!adultId) {
    return res.json({success: false, message: 'Please pass the adult ID'});
  }

  try{
    
    const existingnote = await noteModel.findOne({
      "adultId": adultId, "noteType": noteType
    });
    if(!existingnote || existingnote.length == 0 ) {
      const adult = await noteModel.create({
        note,
        noteType,
        adultId,
      });
      await adult.save(); 
      return res.json({success: true, message: 'Added successfully.'});        
    } else {     
      return res.json({success: false, message: 'Already Exist.'});
    }
  }catch(error) {
      console.error('Error:', error);
      return res.json({success: false, message: error.message});
  }
}

export const getAllAdultsData = async (req, res) => {
  try {
    const adults = await adultModel.find({});

    if (!adults || adults.length === 0) {
      return res.json({ success: false, message: 'No Adults found' });
    }

    const adultsData = adults.map((adult) => ({
      userId: adult.userId,
      name: adult.fullName,
      nic: adult.nic,
    }));

    res.json({
      success: true,
      adultsData: adultsData,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  const { noteType, adultId } = req.body;

  if(!adultId) {
    return res.json({success: false, message: 'The adultId is mandotory'});
  }
  if( !noteType) {
    return res.json({success: false, message: 'The note type is mandotory'});
  }
  try {

    const note = await noteModel.findOneAndDelete({ "adultId": adultId, "noteType": noteType});

    if (!note) {
      return res.json({ success: false, message: 'Note not found' });
    }

    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};