const { getCategories } = require("../services/categoryService");

const getCategory = async (req, res) => {
  try {
    const key = req.params.key === ":" ? "" : req.params.key;

    const categories = await getCategories();
    if (!categories) {
      return res.status(404).json({ message: "Categories not found" });
    }
    const fuzzyMatches = getTopFuzzyMatches(key, categories);
    console.log("fuzzyMatches", fuzzyMatches);
    res.json(fuzzyMatches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

function getTopFuzzyMatches(input, categories) {
  const categoryNames = categories.map((category) =>
    category.name.toLowerCase()
  );

  // Perform the fuzzy search
  const matches = categoryNames.filter((name) =>
    name.toLowerCase().startsWith(input.toLowerCase())
  );
  return input ? matches.slice(0, 5) : categoryNames;
}
module.exports = {
  getCategory,
};
