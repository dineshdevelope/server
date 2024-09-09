import Movie from "../models/movie.model.js";

export const readData = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.ststus(500).json({ message: error.message });
  }
};

//Single Data
export const singleData = async (req, res) => {
  try {
    const movie = Movie.findById(req.params.id);

    if (movie == null) {
      return res.status(500).json({ message: "Can not Find Movies" });
    } else {
      res.json(movie);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createData = async (req, res) => {
  //Create the Movie
  //id,tittle,desc
  console.log(req.body);

  //Validate
  const newMovie = new Movie({
    title: req.body.title,
    desc: req.body.desc,
  });
  try {
    const movie = await newMovie.save();
    return res.status(201).json(movie);
  } catch (error) {}
  return res.status(400).json({ message: error.message });
};

export const updateData = async (req, res) => {
  //Validation

  try {
    const updatedData = await Movie.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        desc: req.body.desc,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteData = async (req, res) => {
  const dataId = req.params.id;

  try {
    await Movie.deleteOne({ _id: dataId });
    res.json({ message: "Data Deleted" });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};
