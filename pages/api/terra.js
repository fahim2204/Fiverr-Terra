import dbConnect from "../../lib/dbConnect";
import Energy from "../../models/energy";


export default async function handler (req, res) {
    const { method } = req
  
    await dbConnect()
  
    switch (method) {
      case 'GET':
        try {
          const energies = await Energy.find({})
          res.status(200).json({ success: true, data: energies })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
      case 'POST':
        try {
          const energy = await Energy.create(req.body)
          res.status(201).json({ success: true, data: energy })
        } catch (error) {
          res.status(400).json({ error: error })
        }
        break
      default:
        res.status(400).json({ success: false })
        break
    }
  }