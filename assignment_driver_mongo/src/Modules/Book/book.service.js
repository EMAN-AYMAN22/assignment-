
import { BookModel } from "../../DB/Models/bookModel.js";
import LogModel from "../../DB/Models/logModel.js";
export const createBookCollection = async (req, res) => {
  try {
    // التعديل هنا: استخدام insertOne بدلاً من create
    const bookCollection = await BookModel.insertOne(req.body);

    res.status(201).json({
      status: "ok:1",
      data: bookCollection,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const createIndexTitle = async (req, res) => {
  try {
    // إنشاء فهرس على حقل "title"
    const indexResult = await BookModel.createIndex({ title: 1 });
    res.status(200).json({
      status: "ok:1",
      data: indexResult,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const createMultipleBooks = async (req, res) => {
  try {
    const books = req.body; //
    const muiltipleBooks = await BookModel.insertMany(books);
    res.status(201).json({
      status: "ok:1",
      data: muiltipleBooks,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const updateBooks = async (req, res) => {
  try {
    const { title } = req.params;
    if (!title) {
      return res.status(400).json({
        status: "fail",
        message: "Title parameter is required",
      });
    }

    const updatedBook = await BookModel.updateOne(
      { title: title },
      { $set: { year: 2022 } },
    );

    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const getBookByTitle = async (req, res) => {
  const { title } = req.query;

  try {
    const book = await BookModel.findOne({ title: title });

    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Book not found",
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getBookByYears = async (req, res) => {
  const { from, to } = req.query;
  try {
    const books = await BookModel.find({
      year: {
        $gte: Number(from), //coming from query string, convert to number
        $lte: Number(to),
      },
    }).toArray();
    res.status(200).json({
      status: "ok:1",
      data: books,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.query;

    // استخدام الـ regex للبحث داخل عناصر المصفوفة
    const books = await BookModel.find({
      genres: genre,
      // genres: { $regex: new RegExp(genre.trim(), "i") }
    }).toArray();

    return res.status(200).json({
      status: "ok:1",
      data: books,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const getBooksLimit = async (req, res) => {
  try {
    const books = await BookModel.find({})
      .sort({ year: -1 })
      .skip(2)
      .limit(3)
      .toArray();
    res.status(200).json({ books });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const getBooksByYearInteger= async (req, res) => {
  try {
    const books = await BookModel.find({
      year: { $type: "int" },
    }).toArray();
    res.status(200).json({
      status: "ok:1",
      data: books,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const getBooksByExcludeGenres = async (req, res) => {
  try {
    const books = await BookModel.find({
      genres: { $nin: ["Horror", "Science Fiction"] }, //not in expretion
    }).toArray();
    res.status(200).json({
      status: "ok:1",
      data: books,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
export const deleteBooksBeforeYear = async (req, res) => {
  try {
    const { year } = req.query; 

    const result = await BookModel.deleteMany({ 
      year: { $lt: Number(year) } 
    });

    return res.status(200).json({
      status: "ok:1",
      data: result 
    });
    
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
export const aggregate1 = async (req, res) => {
try {
    const books= await BookModel.aggregate([
      { $match: { year: { $gt: 2000 } } }, // فلترة الكتب التي سنة نشرها أكبر من 2000
      { $sort: { year: -1 } }             // الترتيب تنازلياً حسب السنة
    ]).toArray();
    res.status(200).json({
      status: "ok:1",
      data: books // أو books: books حسب ما تفضلين، لكن احذري أن تكون كائن فارغ {}
    })
} catch (error) {
      return res.status(400).json({
      status: "fail",
      message: error.message,
    });
}
}
export const aggregate2 = async (req, res) => {
  try {
    
const books= await BookModel.aggregate([
  {$match:{year:{$gt:2000}}},
  {$project:{title:1,year:1,author:1,_id:0}}, 
]).toArray();

    res.status(200).json({
      status: "ok:1",
      data: books 
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
export const aggregate3 = async (req, res) => {
  try {
    
    const books= await BookModel.aggregate([
      { $unwind: "$genres" }, // تفكيك مصفوفة التصنيفات إلى مستندات منفصلة
      {
        $project: {
          _id: 0,
          title: 1,
          genres: 1
        }
      }
    ]).toArray();
    
    res.status(200).json({
      status: "ok:1",
      data: books,
    })
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
}
// //export const aggregate4 = async (req, res) => {
//   try {

//     const books= await LogModel.aggregate([
//       {
//         $lookup: {
//           from: "books",         // اسم جدول الكتب في قاعدة البيانات
//           localField: "book_id", // الحقل المشترك في جدول الـ logs
//           foreignField: "_id",   // الحقل في جدول الـ books
//           as: "book_details"     // اسم المصفوفة الناتجة كما هو مطلوب في الصورة
//         }
//       }
//     ]).toArray();
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: error.message,
//     })
//   }
//}
