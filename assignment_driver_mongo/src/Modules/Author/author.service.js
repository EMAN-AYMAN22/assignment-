import authorModel from "../../DB/Models/authorModel.js";

export const createAuthor = async (req, res) => {
    const { name, nationality} = req.body;

    try {
        const author = await authorModel.insertOne({ name, nationality });
        res.status(201).json({
            status: "success",
            data: author
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}