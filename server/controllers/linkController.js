import { LinkModel } from "../models/Link.js"

export const createShortLink = async(req, res) => {
    try {
        const {originalUrl, customAlias} = req.body

        if(!originalUrl){
            return res.status(400).json({
                msg: "originalUrl is required"
            })
        }
        try {
            const parsed = new URL(originalUrl)
            if(!['http:', 'https:'].includes(parsed.protocol)){
                throw new Error()
            }
        } catch (error) {
            return res.status(400).json({
                msg: "Olease provide a valid http/https URL"
            })
        }

        let shortCode;
        if(customAlias){
            const existing = await LinkModel.findOne({shortCode: customAlias})
            if(existing){
                return res.status(400).json({
                    msg: 'This alias is already in use'
                })
            }
            shortCode = customAlias;
        } else{
            let isUnique = false;
            while(!isUnique){
                shortCode = nanoid(6)
                const existing = await LinkModel.findOne({shortCode})
                if(!existing){
                    isUnique = true
                }
            }
        }    
        
        const link = await LinkModel.create({
            shortCode,
            originalUrl,
            customAlias: Boolean(customAlias)
        })

        return res.status(201).json(link)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Something went wrong creating the link"
        })
    }
}


// GET /:shortCode  -> redirect to original URL
export const redirectToOriginal = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const link = await LinkModel.findOne({ shortCode });

    if (!link || !link.isActive) {
      return res.status(404).json({ message: 'Link not found or inactive' });
    }

    if (link.expiresAt && link.expiresAt < new Date()) {
      return res.status(410).json({ message: 'This link has expired' });
    }


    LinkModel.updateOne({ _id: link._id }, { $inc: { clicks: 1 } }).catch((err) =>
      console.error('Failed to log click:', err)
    );

    return res.redirect(302, link.originalUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

// GET /api/links  -> list all links (for the dashboard/table in your UI)
export const getAllLinks = async (req, res) => {
  try {
    const links = await LinkModel.find().sort({ createdAt: -1 });
    return res.json(links);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to fetch links' });
  }
};

// GET /api/links/:id  -> single link details/stats
export const getLinkById = async (req, res) => {
  try {
    const link = await LinkModel.findById(req.params.id);
    if (!link) return res.status(404).json({ message: 'Link not found' });
    return res.json(link);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to fetch link' });
  }
};

// PATCH /api/links/:id  -> toggle active/inactive (matches your Active/Inactive UI)
export const toggleLinkStatus = async (req, res) => {
  try {
    const link = await LinkModel.findById(req.params.id);
    if (!link) return res.status(404).json({ message: 'Link not found' });

    link.isActive = !link.isActive;
    await link.save();

    return res.json(link);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to update link' });
  }
};

// DELETE /api/links/:id
export const deleteLink = async (req, res) => {
  try {
    const deleted = await LinkModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Link not found' });
    return res.json({ message: 'Link deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to delete link' });
  }
};